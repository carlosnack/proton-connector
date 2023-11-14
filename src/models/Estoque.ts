import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../config/sequelize'

interface EstoqueAttributes {
  estoqueId: string
  produtoId: number
  quantidade: number
}

interface EstoqueCreationAttributes
  extends Optional<EstoqueAttributes, 'estoqueId'> {}

class Estoque
  extends Model<EstoqueAttributes, EstoqueCreationAttributes>
  implements EstoqueAttributes
{
  public estoqueId!: string
  public produtoId!: number
  public quantidade!: number

  // Aqui você define os relacionamentos e configurações do modelo
}

Estoque.init(
  {
    estoqueId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantidade: {
      type: DataTypes.INTEGER,
    },
    // Outros atributos...
  },
  {
    sequelize,
    modelName: 'Estoque',
  },
)

export default Estoque
