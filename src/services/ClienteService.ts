import axiosRetry from "axios-retry";
import { ClienteCreationAttributes } from "../models/Cliente";
import ClienteRepository from "../repositories/ClienteRepository";
import { HttpError } from "../utils/httpError";
import axios from "axios";
axiosRetry(axios, {
  retries: 3,
  retryCondition: () => true,
  retryDelay: (retryCount) => retryCount * 1000,
});

export default class ClienteService {
  static async criarCliente(cliente: ClienteCreationAttributes) {
    try {
      const cepApiUrl = new URL("https://www.cepaberto.com/api/v3/cep");
      cepApiUrl.searchParams.append("cep", cliente.cep);

      const response = await axios.get(cepApiUrl.toString(), {
        headers: { Authorization: `Token token=${process.env.CEP_API_TOKEN}` },
      });
      const { latitude, longitude } = response.data;

      return await ClienteRepository.criarCliente(cliente, latitude, longitude);
    } catch (err) {
      console.error(err);
      throw new HttpError(
        500,
        "Não foi possível criar o cliente agora, aguarde um pouco e tente novamente"
      );
    }
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
    const cliente = await this.acessarCliente(clienteId);
    await ClienteRepository.atualizarCliente(clienteId, updateInfo);

    return cliente.reload();
  }
}
