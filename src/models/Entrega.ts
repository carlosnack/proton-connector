import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

export enum StatusEntregaEnum {
  PENDENTE = "PENDENTE",
  DESPACHADO = "DESPACHADO",
  EM_TRANSITO = "EM TRÂNSITO",
  ENTREGUE = "ENTREGUE",
}

interface EntregaAttributes {
  entregaId: number;
  codigoRastreio?: string;
  statusEntrega?: StatusEntregaEnum;
  deleted?: boolean;
}

interface EntregaCreationAttributes
  extends Optional<EntregaAttributes, "entregaId"> {}

class Entrega
  extends Model<EntregaAttributes, EntregaCreationAttributes>
  implements EntregaAttributes
{
  public entregaId!: number;
  public codigoRastreio!: string;
  public statusEntrega!: StatusEntregaEnum;
  public deleted!: boolean;
}

Entrega.init(
  {
    entregaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigoRastreio: {
      type: DataTypes.STRING,
    },
    statusEntrega: {
      type: DataTypes.ENUM(),
      values: Object.values(StatusEntregaEnum),
      defaultValue: StatusEntregaEnum.PENDENTE,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Entrega",
  }
);

export default Entrega;
