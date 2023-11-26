import { isNull } from "lodash";
import { HttpError } from "../utils/httpError";
import NotaFiscalService from "./NotaFiscalService";
import Produto from "../models/Produto";
import Decimal from "decimal.js";
import ClienteService from "./ClienteService";
import ProdutoService from "./ProdutoService";
import PagamentoService from "./PagamentoService";
import { PagamentoMetodoEnum } from "../models/Pagamento";
import EntregaService from "./EntregaService";
import VendaRepository from "../repositories/VendaRepository";
import VendaProdutoService from "./VendaProdutoService";

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
     * TODO: Gerar Nota fiscal
     * TODO: Enviar email com nota fiscal
     * TODO: Enviar email com método de pagamento para o cliente
     * TODO: Criar rota na API para processar o pagamento
     */

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

    return { venda, valorTotal: valorVenda };
  }

  static async buscarVenda() {
    return VendaRepository.buscarVenda();
  }
}
