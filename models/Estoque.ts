import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../sequelize';

interface EstoqueAttributes {
  estoqueId: number;
  produtoId: number;
  quantidade: number;
}

interface EstoqueCreationAttributes extends Optional<EstoqueAttributes, 'estoqueId'> {}

class Estoque extends Model<EstoqueAttributes, EstoqueCreationAttributes> implements EstoqueAttributes {
  public estoqueId!: number;
  public produtoId!: number;
  public quantidade!: number;

  // Aqui você define os relacionamentos e configurações do modelo

}

Estoque.init(
  {
    estoqueId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    produtoId: {
        type: DataTypes.INTEGER
    },
    quantidade: {
      type: DataTypes.number
    }
    // Outros atributos...
  },
  {
    sequelize,
    modelName: 'Estoque',
  }
);

export default Estoque;
