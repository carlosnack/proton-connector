import { ClienteCreationAttributes } from "../models/Cliente";
import ClienteRepository from "../repositories/ClienteRepository";
import { HttpError } from "../utils/httpError";

export default class ClienteService {
  static async criarCliente(cliente: ClienteCreationAttributes) {
    return await ClienteRepository.criarCliente(cliente);
  }
  static async buscarCliente(nome?: string, cnpj?: string) {
    return ClienteRepository.buscarCliente(nome, cnpj);
  }
  static async acessarCliente(clienteId: number) {
    const cliente = await ClienteRepository.acessarCliente(clienteId);
    if (!cliente) {
      throw new HttpError(404, "Cliente não encontrado");
    }

    return cliente;
  }
  static async atualizarCliente(
    clienteId: number,
    updateInfo: Record<string, any>
  ) {
    await this.acessarCliente(clienteId);
    await ClienteRepository.atualizarCliente(clienteId, updateInfo);

    return await this.acessarCliente(clienteId);
  }
}
