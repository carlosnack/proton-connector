import { Transaction } from "sequelize";
import Venda from "../models/Venda";

export default class VendaRepository {
  static async criarVenda(
    clienteId: number,
    pagamentoId: number,
    notaFiscalId: number,
    entregaId: number,
    dataVenda: Date,
    transaction?: Transaction
  ): Promise<Venda> {
    return Venda.create(
      {
        clienteId,
        pagamentoId,
        notaFiscalId,
        entregaId,
        dataVenda,
      },
      { transaction }
    );
  }

  static buscarVenda() {
    return Venda.findAll({
      include: ["notaFiscal", "cliente", "pagamento", "entrega", "produtos"],
    });
  }

  static async acessarVenda(vendaId: number) {
    return Venda.findByPk(vendaId, {
      include: ["notaFiscal", "cliente", "pagamento", "entrega", "produtos"],
    });
  }
}
