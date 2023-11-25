import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

export interface ClienteAttributes {
  clienteId?: number;
  nome: string;
  email: string;
  cnpj: string;
  cpf: string;
  cep: string;
  endereco: string;
  numero: string;
  deleted?: boolean;
}

export interface ClienteCreationAttributes
  extends Optional<ClienteAttributes, "clienteId"> {}

class Cliente
  extends Model<ClienteAttributes, ClienteCreationAttributes>
  implements ClienteAttributes
{
  public clienteId!: number;
  public nome!: string;
  public email!: string;
  public cnpj!: string;
  public cpf!: string;
  public cep!: string;
  public endereco!: string;
  public numero!: string;
  public deleted!: boolean;
  // Aqui você define os relacionamentos e configurações do modelo
}

Cliente.init(
  {
    clienteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
  }
);

export default Cliente;
