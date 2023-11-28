import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import Arquivo from "./Arquivo";

export enum NotaFiscalStatus {
  PENDENTE = "PENDENTE",
  EMITIDA = "EMITIDA",
  CANCELADA = "CANCELADA",
}

interface NotaFiscalAttributes {
  notaFiscalId: number;
  dataEmissao?: Date;
  valor: number;
  status?: NotaFiscalStatus;
  arquivoId?: number;
  deleted?: boolean;
}

interface NotaFiscalCreationAttributes
  extends Optional<NotaFiscalAttributes, "notaFiscalId"> {}

class NotaFiscal
  extends Model<NotaFiscalAttributes, NotaFiscalCreationAttributes>
  implements NotaFiscalAttributes
{
  public notaFiscalId!: number;
  public dataEmissao!: Date;
  public valor!: number;
  public status!: NotaFiscalStatus;
  public arquivoId!: number;
  public deleted!: boolean;
  // Aqui você define os relacionamentos e configurações do modelo
  public static associate(models: any): void {
    NotaFiscal.hasOne(Arquivo, {
      foreignKey: "notaFiscalId",
      as: "arquivo",
    });
  }
}

NotaFiscal.init(
  {
    notaFiscalId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    arquivoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dataEmissao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(),
      values: Object.values(NotaFiscalStatus),
      allowNull: false,
      defaultValue: NotaFiscalStatus.PENDENTE,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "NotaFiscal",
  }
);

export default NotaFiscal;
