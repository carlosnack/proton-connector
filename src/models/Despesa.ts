import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

interface DespesaAttributes {
  despesaId: number;
  descricao: string;
  valor: number;
  data_vencimento: Date;
  data_criacao: Date;
  status: boolean;
}

interface DespesaCreationAttributes extends Optional<DespesaAttributes, "despesaId" | "data_criacao"> {}

class Despesa extends Model<DespesaAttributes, DespesaCreationAttributes> {
  public despesaId!: number;
  public descricao!: string;
  public valor!: number;
  public data_vencimento!: Date;
  public data_criacao!: Date;
  public status!: boolean;

  // Aqui você pode definir os relacionamentos e configurações do modelo, se necessário
}

Despesa.init(
  {
    despesaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Despesa",
  }
);

export default Despesa;
