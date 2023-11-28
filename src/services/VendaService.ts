import { isNull } from "lodash";
import { HttpError } from "../utils/httpError";
import NotaFiscalService from "./NotaFiscalService";
import Decimal from "decimal.js";
import ClienteService from "./ClienteService";
import ProdutoService from "./ProdutoService";
import PagamentoService from "./PagamentoService";
import { PagamentoMetodoEnum } from "../models/Pagamento";
import EntregaService from "./EntregaService";
import VendaRepository from "../repositories/VendaRepository";
import VendaProdutoService from "./VendaProdutoService";
import sequelize from "../config/sequelize";
import MailService from "./MailService";
import JwtService from "./JwtService";

type CriarVendaProdutosProps = { produtoId: number; quantidade: number }[];
interface CriarVendaPagamentoProps {
  metodo: PagamentoMetodoEnum;
}
export default class VendaService {
  private static somarPrecos(produtos: any[]) {
    const totalDecimal: Decimal = produtos.reduce((total, produto) => {
      const preco = new Decimal(produto.preco || 0);
      const quantidade = new Decimal(produto.quantidade || 1);

      return total.plus(preco.times(quantidade));
    }, new Decimal(0));

    return totalDecimal.toNumber();
  }

  static async criarVenda(
    clienteId: number,
    produtos: CriarVendaProdutosProps,
    pagamento: CriarVendaPagamentoProps
  ) {
    /**
     * TODO: Gerar Nota fiscal(Isso vai ficar no pagamento)
     * TODO: Enviar email com nota fiscal
     * TODO: Enviar email com método de pagamento para o cliente
     * TODO: Criar rota na API para processar o pagamento
     */

    const t = await sequelize.transaction();

    const produtosFound = await Promise.all(
      produtos.map(async (prod) => {
        const produto = await ProdutoService.acessarProduto(prod.produtoId);
        return {
          produtoId: produto.produtoId,
          preco: produto.preco,
          quantidade: prod.quantidade,
        };
      })
    );
    if (produtosFound.some((produto) => isNull(produto))) {
      throw new HttpError(400, "Um ou mais Ids de produtos são inválidos");
    }

    const cliente = await ClienteService.acessarCliente(clienteId);

    const valorVenda = this.somarPrecos(produtosFound);

    const notaFiscalCreated = await NotaFiscalService.criarNotaFiscal(
      valorVenda,
      new Date()
    );

    const pagamentoCreated = await PagamentoService.criarPagamento(
      pagamento.metodo
    );

    const entregaCreated = await EntregaService.criarEntrega();

    const venda = await VendaRepository.criarVenda(
      cliente.clienteId,
      pagamentoCreated.pagamentoId,
      notaFiscalCreated.notaFiscalId,
      entregaCreated.entregaId,
      new Date()
    );

    await VendaProdutoService.criarVendaProdutos(
      venda.vendaId,
      produtosFound as any
    );

    const token = JwtService.generateTokenObject({
      clienteId: cliente.clienteId,
      email: cliente.email,
      nome: cliente.nome,
      pagamentoId: pagamentoCreated.pagamentoId,
      vendaId: venda.vendaId,
    });

    const mailOptions = {
      from: "no-reply@proton.com",
      to: "vinicius.prado@unesp.br",
      subject: "Sua compra foi registrada",
      text: `Olá seu pedido foi registrado, para acessar e efetuar o pagamento basta seguir o seguinte link: ${process.env.API_URL}/pagamentos/${token}`,
    };

    await MailService.sendMail(mailOptions);

    await t.commit();

    return { venda, valorTotal: valorVenda };
  }

  static async buscarVenda() {
    return VendaRepository.buscarVenda();
  }

  static async acessarVenda(vendaId: number) {
    return VendaRepository.acessarVenda(vendaId);
  }
}
