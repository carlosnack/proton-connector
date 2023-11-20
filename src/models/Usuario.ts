import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../config/sequelize'

interface UsuarioAttributes {
  userID: number;
  name: number;
  passwordHash: string;
  email: string;
  active: boolean;
}

interface UsuarioCreationAttributes
  extends Optional<UsuarioAttributes, 'userID'> { }

class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes {
  public userID!: number;
  public name!: number;
  public passwordHash!: string;
  public email!: string;
  public active!: boolean;

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
    email: {
      type: DataTypes.STRING,
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    modelName: 'Usuario',
  },
)

export default Usuario;
