import { SendMailOptions } from "nodemailer";
import sequelize from "../config/sequelize";
import { NotaFiscalStatus } from "../models/NotaFiscal";
import { PagamentoMetodoEnum, PagamentoStatusEnum } from "../models/Pagamento";
import PagamentoRepository from "../repositories/PagamentoRepository";
import { HttpError } from "../utils/httpError";
import MailService from "./MailService";
import NotaFiscalService from "./NotaFiscalService";
import VendaService from "./VendaService";

export default class PagamentoService {
  static async criarPagamento(metodoPagamento: PagamentoMetodoEnum) {
    return PagamentoRepository.criarPagamento(metodoPagamento);
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

    const venda = await VendaService.acessarVenda(vendaId);
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

    //TODO generate pdf nota fiscal
    await NotaFiscalService.atualizarNotaFiscal(venda.notaFiscalId, {
      status: NotaFiscalStatus.EMITIDA,
    });

    // TODO: Send NF to email after genate pdf and update NF status
    // await MailService.sendMail(mailOptions);

    await t.commit();
    return venda;
  }

  static async acessarPagamento(pagamentoId: number) {
    return PagamentoRepository.acessarPagamento(pagamentoId);
  }

  static async buscarPagamento(status: PagamentoStatusEnum) {
    return PagamentoRepository.buscarPagamento(status);
  }
}
