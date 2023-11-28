import { Model, DataTypes, Optional, Association } from "sequelize";
import sequelize from "../config/sequelize";
import NotaFiscal from "./NotaFiscal";
import Cliente from "./Cliente";
import Pagamento from "./Pagamento";
import Entrega from "./Entrega";
import Produto from "./Produto";
import VendaProduto from "./VendaProduto";

interface VendaAttributes {
  vendaId: number;
  notaFiscalId: number;
  clienteId: number;
  pagamentoId: number;
  entregaId: number;
  dataVenda: Date;
  deleted?: boolean;
}

interface VendaCreationAttributes
  extends Optional<VendaAttributes, "vendaId"> {}

class Venda
  extends Model<VendaAttributes, VendaCreationAttributes>
  implements VendaAttributes
{
  public vendaId!: number;
  public notaFiscalId!: number;
  public clienteId!: number;
  public pagamentoId!: number;
  public entregaId!: number;
  public deleted!: boolean;
  public dataVenda!: Date;

  public static associate(models: any): void {
    Venda.belongsTo(models.NotaFiscal, {
      foreignKey: "notaFiscalId",
      as: "notaFiscal",
    });
    Venda.belongsTo(models.Cliente, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    Venda.belongsTo(models.Pagamento, {
      foreignKey: "pagamentoId",
      as: "pagamento",
    });
    Venda.belongsTo(models.Entrega, {
      foreignKey: "entregaId",
      as: "entrega",
    });

    Venda.belongsToMany(models.Produto, {
      through: VendaProduto,
      foreignKey: "vendaId",
      as: "produtos",
    });
  }
}

Venda.init(
  {
    vendaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notaFiscalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pagamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entregaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataVenda: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Venda",
  }
);

export default Venda;
