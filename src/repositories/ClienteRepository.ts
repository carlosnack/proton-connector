import { Op } from "sequelize";
import Cliente, { ClienteCreationAttributes } from "../models/Cliente";

export default class ClienteRepository {
  static async criarCliente(
    cliente: ClienteCreationAttributes,
    latitude: number,
    longitude: number
  ): Promise<Cliente> {
    return await Cliente.create(
      { ...cliente, latitude, longitude },
      {
        returning: [
          "clienteId",
          "nome",
          "email",
          "cnpj",
          "cpf",
          "cep",
          "endereco",
          "numero",
          "latitude",
          "longitude",
        ],
      }
    );
  }

  static async buscarCliente(nome?: string, cnpj?: string): Promise<Cliente[]> {
    const condition: any = {};
    if (nome) {
      condition.nome = { [Op.like]: `%${nome}%` };
    }
    if (cnpj) {
      condition.cnpj = { [Op.like]: `%${cnpj}%` };
    }
    return await Cliente.findAll({ where: condition });
  }

  static async acessarCliente(clienteId: number): Promise<Cliente | null> {
    const cliente = await Cliente.findByPk(clienteId);

    return cliente;
  }

  static async atualizarCliente(
    clienteId: number,
    updateInfo: Partial<Cliente>
  ): Promise<number> {
    const [affectedRows] = await Cliente.update(updateInfo, {
      where: { clienteId },
    });

    return affectedRows;
  }
}
