import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../config/sequelize'

interface UsuarioAttributes {
  userID: number;
  name: number;
  password: string;
  email: string;
}

interface UsuarioCreationAttributes
  extends Optional<UsuarioAttributes, 'userID'> {}

class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes
{
  public userID!: number;
  public name!: number;
  public password!: string;
  public email!: string;

  // Aqui você define os relacionamentos e configurações do modelo
}

Usuario.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
    },
    email : {
        type: DataTypes.STRING,
    }
    // Outros atributos...
  },
  {
    sequelize,
    modelName: 'Usuario',
  },
)

export default Usuario;
