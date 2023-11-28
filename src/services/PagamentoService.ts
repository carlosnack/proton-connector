import { PagamentoMetodoEnum, PagamentoStatusEnum } from "../models/Pagamento";
import PagamentoRepository from "../repositories/PagamentoRepository";
import { HttpError } from "../utils/httpError";

export default class PagamentoService {
  static async criarPagamento(metodoPagamento: PagamentoMetodoEnum) {
    return PagamentoRepository.criarPagamento(metodoPagamento);
  }

  static async efetuarPagamento(
    pagamentoId: number,
    statusPagamento: PagamentoStatusEnum,
    dataPagamento: Date
  ) {
    const pagamento = await PagamentoRepository.acessarPagamento(pagamentoId);
    if (!pagamento) {
      throw new HttpError(400, "Esse pagamento não existe");
    }

    if (pagamento.statusPagamento === PagamentoStatusEnum.APROVADO) {
      throw new HttpError(400, "Esse pagamento já foi aprovado");
    }

    return PagamentoRepository.atualizarPagamento({
      pagamentoId,
      statusPagamento,
      dataPagamento,
    });
  }

  static async acessarPagamento(pagamentoId: number) {
    return PagamentoRepository.acessarPagamento(pagamentoId);
  }

  static async buscarPagamento(status: PagamentoStatusEnum) {
    return PagamentoRepository.buscarPagamento(status);
  }
}
