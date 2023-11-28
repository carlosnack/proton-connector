import sequelize from "../config/sequelize";
import { NotaFiscalStatus } from "../models/NotaFiscal";
import { PagamentoMetodoEnum, PagamentoStatusEnum } from "../models/Pagamento";
import PagamentoRepository from "../repositories/PagamentoRepository";
import { HttpError } from "../utils/httpError";
import NotaFiscalService from "./NotaFiscalService";
import VendaService from "./VendaService";
import { fileToSaveFolderPath } from "../utils/file";
import { nanoid } from "../utils/nanoid";
import ArquivoService from "./ArquivoService";
import MailService, { SendMailProps } from "./MailService";
import { Transaction } from "sequelize";

export default class PagamentoService {
  static async criarPagamento(
    metodoPagamento: PagamentoMetodoEnum,
    transaction?: Transaction
  ) {
    return PagamentoRepository.criarPagamento(metodoPagamento, transaction);
  }

  static async efetuarPagamento(
    pagamentoId: number,
    statusPagamento: PagamentoStatusEnum,
    dataPagamento: Date,
    vendaId: number
  ) {
    const pagamento = await PagamentoRepository.acessarPagamento(pagamentoId);
    if (!pagamento) {
      throw new HttpError(400, "Esse pagamento não existe");
    }
    if (pagamento.statusPagamento === PagamentoStatusEnum.APROVADO) {
      throw new HttpError(400, "Esse pagamento já foi aprovado");
    }

    const venda = (await VendaService.acessarVenda(vendaId)) as Record<
      string,
      any
    >;
    if (!venda) {
      throw new HttpError(
        400,
        `Não foi possível encontrar uma venda com o id ${vendaId}`
      );
    }
    const t = await sequelize.transaction();

    await PagamentoRepository.atualizarPagamento({
      pagamentoId,
      statusPagamento,
      dataPagamento,
    });

    const produtos = venda.produtos.map((produtoVenda: any) => ({
      preco: produtoVenda.VendaProduto.precoUnitario,
      quantidade: produtoVenda.VendaProduto.quantidade,
      nome: produtoVenda.nome,
    }));

    const valorTotal = VendaService.somarPrecos(produtos);

    const dataEmissao = new Date();

    const notaFiscalArquivo = await NotaFiscalService.gerarPdfNotaFiscal({
      valorTotal,
      produtos,
      dataEmissao,
      nomeCliente: venda.cliente.nome,
      notaId: venda.notaFiscalId,
    });

    const nomeArquivo = nanoid();
    const caminho = fileToSaveFolderPath(nomeArquivo);

    const arquivoCreated = await ArquivoService.criarArquivo(
      nomeArquivo,
      caminho,
      notaFiscalArquivo
    );

    await NotaFiscalService.atualizarNotaFiscal(venda.notaFiscalId, {
      status: NotaFiscalStatus.EMITIDA,
      dataEmissao,
      arquivoId: arquivoCreated.arquivoId,
    });

    const mailOptions: SendMailProps = {
      from: "no-reply@proton.com",
      to: venda.cliente.email,
      subject: `Nota Fiscal Eletrônica - nº ${venda.notaFiscalId}`,
      text: `Olá ${venda.cliente.nome}, aqui está o link para acessar sua nota fiscal online:  ${process.env.API_URL}/arquivos/${arquivoCreated.arquivoId}`,
      attachments: [
        {
          filename: arquivoCreated.nome,
          path: arquivoCreated.caminho,
          contentType: "application/pdf",
        },
      ],
    };

    await MailService.sendMail(mailOptions);

    await t.commit();
    return venda.reload();
  }

  static async acessarPagamento(pagamentoId: number) {
    return PagamentoRepository.acessarPagamento(pagamentoId);
  }

  static async buscarPagamento(status: PagamentoStatusEnum) {
    return PagamentoRepository.buscarPagamento(status);
  }
}
