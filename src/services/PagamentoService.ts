import sequelize from "../config/sequelize";
import { PagamentoMetodoEnum, PagamentoStatusEnum } from "../models/Pagamento";
import PagamentoRepository from "../repositories/PagamentoRepository";
import { HttpError } from "../utils/httpError";
import MailService from "./MailService";
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

    const t = await sequelize.transaction();

    await PagamentoRepository.atualizarPagamento({
      pagamentoId,
      statusPagamento,
      dataPagamento,
    });

    // TODO: Send NF to email
    // await MailService.sendMail(mailOptions);

    await t.commit();
    return VendaService.acessarVenda(vendaId);
  }

  static async acessarPagamento(pagamentoId: number) {
    return PagamentoRepository.acessarPagamento(pagamentoId);
  }

  static async buscarPagamento(status: PagamentoStatusEnum) {
    return PagamentoRepository.buscarPagamento(status);
  }
}
