import EntregaRepository from "../repositories/EntregaRepository";

export default class EntregaService {
  static async criarEntrega() {
    return EntregaRepository.criarEntrega();
  }
}
