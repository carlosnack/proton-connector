import { Transaction } from "sequelize";
import Entrega from "../models/Entrega";

export default class EntregaRepository {
  static async criarEntrega(transaction?: Transaction): Promise<Entrega> {
    return Entrega.create({}, { transaction });
  }
}
