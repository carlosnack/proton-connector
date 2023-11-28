import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

export enum PagamentoMetodoEnum {
  PIX = "PIX",
  BOLETO = "BOLETO",
  CARTAO = "CARTAO",
}

export enum PagamentoStatusEnum {
  PENDENTE = "PENDENTE",
  APROVADO = "APROVADO",
  CANCELADO = "CANCELADO",
}

interface PagamentoAttributes {
  pagamentoId: number;
  metodoPagamento: PagamentoMetodoEnum;
  statusPagamento?: PagamentoStatusEnum;
  dataPagamento?: Date;
  deleted?: boolean;
}

interface PagamentoCreationAttributes
  extends Optional<PagamentoAttributes, "pagamentoId"> {}

class Pagamento
  extends Model<PagamentoAttributes, PagamentoCreationAttributes>
  implements PagamentoAttributes
{
  public pagamentoId!: number;
  public metodoPagamento!: PagamentoMetodoEnum;
  public statusPagamento!: PagamentoStatusEnum;
  public dataPagamento!: Date;
  public deleted!: boolean;
}

Pagamento.init(
  {
    pagamentoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metodoPagamento: {
      type: DataTypes.ENUM(),
      values: Object.values(PagamentoMetodoEnum),
      allowNull: false,
    },
    statusPagamento: {
      type: DataTypes.ENUM(),
      values: Object.values(PagamentoStatusEnum),
      allowNull: false,
      defaultValue: PagamentoStatusEnum.PENDENTE,
    },
    dataPagamento: {
      type: DataTypes.DATE,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Pagamento",
  }
);

export default Pagamento;
