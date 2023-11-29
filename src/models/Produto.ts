import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import VendaProduto from "./VendaProduto";
import Estoque from "./Estoque";

interface ProdutoAttributes {
  produtoId: number;
  nome: string;
  descricao: string;
  preco: number;
  deleted?: boolean;
}

interface ProdutoCreationAttributes
  extends Optional<ProdutoAttributes, "produtoId"> {}

class Produto
  extends Model<ProdutoAttributes, ProdutoCreationAttributes>
  implements ProdutoAttributes
{
  public produtoId!: number;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
  public deleted!: boolean;

  public static associate(models: any): void {
    Produto.belongsToMany(models.Venda, {
      through: VendaProduto,
      foreignKey: "produtoId",
      otherKey: "vendaId",
      as: "vendas",
    });
  }
}

Produto.init(
  {
    produtoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue("preco" as any));
      },
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Produto",
  }
);

export default Produto;
