import { Model, DataTypes, Optional, Transaction } from "sequelize";
import sequelize from "../config/sequelize";
import Produto from "./Produto";
import Estoque from "./Estoque";

interface VendaProdutoAttributes {
  vendaProdutoId: number;
  produtoId: number;
  vendaId: number;
  quantidade: number;
  precoUnitario: number;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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

  static async baixaEstoque(
    vendasProdutos: VendaProduto[],
    transaction?: Transaction
  ) {
    const promises = vendasProdutos.map(async (vendaProduto) => {
      return Estoque.baixaEstoque(
        vendaProduto.produtoId,
        vendaProduto.quantidade,
        transaction
      );
    });

    const result = await Promise.all(promises);

    return result;
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isNonNegative(value: number) {
          if (value < 0) {
            throw new Error("Preço não pode ser negativo.");
          }
        },
      },
      get() {
        return parseFloat(this.getDataValue("precoUnitario" as any));
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
    // hooks: {
    //   afterBulkCreate: async (vendasProdutos) => {
    //   },
    // },
  }
);

export default VendaProduto;
