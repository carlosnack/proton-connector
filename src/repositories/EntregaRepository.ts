import { Transaction } from "sequelize";
import Entrega, { StatusEntregaEnum } from "../models/Entrega";

export default class EntregaRepository {
  static async criarEntrega(transaction?: Transaction): Promise<Entrega> {
    return Entrega.create({}, { transaction });
  }
  static async atualizarStatusEntrega() {
    const statusArr = Object.values(StatusEntregaEnum);

    const entregas = await Entrega.findAll();
    if (entregas.length === 0) {
      return;
    }

    for (const entrega of entregas) {
      const index = statusArr.findIndex(
        (status) => entrega.statusEntrega === status
      );
      if (index < 0 || entrega.statusEntrega === StatusEntregaEnum.ENTREGUE) {
        continue;
      }

      await Entrega.update(
        { statusEntrega: statusArr[index + 1] },
        { where: { entregaId: entrega.entregaId } }
      );
    }
  }
}
