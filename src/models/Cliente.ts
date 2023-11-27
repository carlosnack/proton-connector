import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import Venda from "./Venda";

export interface ClienteAttributes {
  clienteId?: number;
  nome: string;
  email: string;
  cnpj: string;
  cpf: string;
  cep: string;
  latitude: number;
  longitude: number;
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
  public latitude!: number;
  public longitude!: number;
  public endereco!: string;
  public numero!: string;
  public deleted!: boolean;
  // Aqui você define os relacionamentos e configurações do modelo
  public static associate(models: any): void {
    Cliente.hasMany(models.Venda, {
      foreignKey: "clienteId",
      as: "vendas",
    });
  }
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
    latitude: {
      type: DataTypes.DECIMAL(10, 8), // 10 dígitos no total, 8 após a vírgula
      allowNull: true, // Pode ser alterado para false se a latitude for obrigatória
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8), // 11 dígitos no total, 8 após a vírgula
      allowNull: true, // Pode ser alterado para false se a longitude for obrigatória
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
