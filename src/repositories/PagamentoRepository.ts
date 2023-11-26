import Pagamento, { PagamentoMetodoEnum } from "../models/Pagamento";

export default class PagamentoRepository {
  static async criarPagamento(metodoPagamento: PagamentoMetodoEnum) {
    return Pagamento.create({ metodoPagamento });
  }
}
