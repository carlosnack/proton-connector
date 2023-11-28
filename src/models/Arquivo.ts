import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

export interface ArquivoAttributes {
  arquivoId: number;
  nome: string;
  caminho: string;
  deleted?: boolean;
}

export interface ArquivoCreationAttributes
  extends Optional<ArquivoAttributes, "arquivoId"> {}

class Arquivo
  extends Model<ArquivoAttributes, ArquivoCreationAttributes>
  implements ArquivoAttributes
{
  public arquivoId!: number;
  public nome!: string;
  public caminho!: string;
  public deleted!: boolean;

  public static associate(models: any): void {
    Arquivo.hasOne(models.NotaFiscal, {
      foreignKey: "arquivoId",
      as: "notaFiscal",
    });
  }
}

Arquivo.init(
  {
    arquivoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    caminho: {
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
    modelName: "Arquivo",
  }
);

export default Arquivo;
