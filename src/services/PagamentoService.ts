import { PagamentoMetodoEnum } from "../models/Pagamento";
import PagamentoRepository from "../repositories/PagamentoRepository";

export default class PagamentoService {
  static async criarPagamento(metodoPagamento: PagamentoMetodoEnum) {
    return await PagamentoRepository.criarPagamento(metodoPagamento);
  }
}
