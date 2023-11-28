import { Transaction } from "sequelize";
import EntregaRepository from "../repositories/EntregaRepository";

export default class EntregaService {
  static async criarEntrega(transaction?: Transaction) {
    return EntregaRepository.criarEntrega(transaction);
  }
}
