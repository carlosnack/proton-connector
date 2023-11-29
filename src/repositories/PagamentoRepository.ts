import { Op, Transaction } from "sequelize";
import Pagamento, {
  PagamentoMetodoEnum,
  PagamentoStatusEnum,
} from "../models/Pagamento";

interface UpdatePagamentoProps {
  pagamentoId: number;
  metodoPagamento?: PagamentoMetodoEnum;
  statusPagamento?: PagamentoStatusEnum;
  dataPagamento: Date;
}

export default class PagamentoRepository {
  static async criarPagamento(
    metodoPagamento: PagamentoMetodoEnum,
    transaction?: Transaction
  ) {
    return Pagamento.create({ metodoPagamento }, { transaction });
  }

  static async acessarPagamento(
    pagamentoId: number
  ): Promise<Pagamento | null> {
    const pagamento = await Pagamento.findByPk(pagamentoId);

    return pagamento;
  }

  static async atualizarPagamento({
    pagamentoId,
    metodoPagamento,
    statusPagamento,
    dataPagamento,
  }: UpdatePagamentoProps) {
    return Pagamento.update(
      { metodoPagamento, statusPagamento, dataPagamento },
      {
        where: { pagamentoId },
        returning: true,
      }
    );
  }

  static async buscarPagamento(status?: PagamentoStatusEnum) {
    const condition = status ? { statusPagamento: { [Op.eq]: status } } : {};

    return Pagamento.findAll({ where: condition });
  }
}
