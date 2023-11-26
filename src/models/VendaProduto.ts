import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

interface VendaProdutoAttributes {
  vendaProdutoId: number;
  produtoId: number;
  vendaId: number;
  quantidade: number;
  precoUnitario: number;
  deleted?: boolean;
}

interface VendaProdutoCreationAttributes
  extends Optional<VendaProdutoAttributes, "vendaProdutoId"> {}

class VendaProduto
  extends Model<VendaProdutoAttributes, VendaProdutoCreationAttributes>
  implements VendaProdutoAttributes
{
  public vendaProdutoId!: number;
  public produtoId!: number;
  public vendaId!: number;
  public quantidade!: number;
  public precoUnitario!: number;
  public deleted!: boolean;

  static associate(models: any): void {
    VendaProduto.belongsTo(models.Produto, { foreignKey: "produtoId" });
    VendaProduto.belongsTo(models.Venda, { foreignKey: "vendaId" });
  }
}

VendaProduto.init(
  {
    vendaProdutoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNonNegative(value: number) {
          if (value < 0) {
            throw new Error("Quantidade não pode ser negativo.");
          }
        },
      },
    },
    precoUnitario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNonNegative(value: number) {
          if (value < 0) {
            throw new Error("Preço não pode ser negativo.");
          }
        },
      },
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "VendaProduto",
  }
);

export default VendaProduto;
