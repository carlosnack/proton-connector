import { Model, DataTypes, Optional, Transaction } from "sequelize";
import sequelize from "../config/sequelize";
import Produto from "./Produto";
import { HttpError } from "../utils/httpError";

interface EstoqueAttributes {
  estoqueId?: number;
  produtoId: number;
  quantidade: number;
}

interface EstoqueCreationAttributes
  extends Optional<EstoqueAttributes, "estoqueId"> {}

class Estoque
  extends Model<EstoqueAttributes, EstoqueCreationAttributes>
  implements EstoqueAttributes
{
  public estoqueId!: number;
  public produtoId!: number;
  public quantidade!: number;

  // Aqui você define os relacionamentos e configurações do modelo
  public static async baixaEstoque(
    produtoId: number,
    quantidade: number,
    transaction?: Transaction
  ) {
    const condition = { where: { produtoId } };
    const estoque = await Estoque.findOne(condition);
    const produto = await Produto.findByPk(produtoId);
    if (produto && estoque) {
      // Verifica se há estoque suficiente antes de atualizar
      if (estoque.quantidade >= quantidade) {
        await Estoque.update(
          { quantidade: estoque.quantidade - quantidade },
          { where: { produtoId }, transaction }
        );
        return { success: true };
      } else {
        return {
          success: false,
          message: `Estoque de ${produto.nome}(${estoque.quantidade}) insuficiente para realizar a venda.`,
        };
      }
    } else {
      return { success: false, message: "Produto ou estoque não encontrado." };
    }
  }

  static associate(models: any): void {
    Estoque.belongsTo(models.Produto, {
      foreignKey: "produtoId",
      as: "produto",
    });
  }
}

Estoque.init(
  {
    estoqueId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: "Estoque",
  }
);

export default Estoque;
