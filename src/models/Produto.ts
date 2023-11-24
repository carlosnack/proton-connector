import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";

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
  // Aqui você define os relacionamentos e configurações do modelo
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
