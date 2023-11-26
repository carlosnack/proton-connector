import Entrega from "../models/Entrega";

export default class EntregaRepository {
  static async criarEntrega(): Promise<Entrega> {
    return Entrega.create();
  }
}
