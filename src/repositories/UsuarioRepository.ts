import { connected } from 'process';
import AuthException from '../exceptions/AuthException';
import GenericException from '../exceptions/GenericException';
import Usuario from '../models/Usuario'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';

export default class UsuarioRepository {
  static async criarRegistroDeUsuario(
    userID: number,
    name: number,
    password: string,
    email: string,
    active: boolean,
  ) {
    try {
      const saltRounds = 10; // Número de rounds de "salting" - quanto maior, mais seguro, mas mais lento
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = await Usuario.create({
        userID,
        name,
        passwordHash,
        email,
        active,
      });
      Reflect.deleteProperty(user, 'passwordHash');
      return user;

    } catch (e) {
      throw new GenericException({ name: "errorUserCreation", message: "Error during user creation", statusCode: 500 });
    }
  }
    
  static async signIn(
      password: string,
      email: string) {

    const where = { email };

    const user = await Usuario.findOne({ where });
    if (!user) {
      throw new AuthException(AuthException.LoginDontExists);
    }
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new AuthException(AuthException.LoginPasswordNotAllowed);
    }
    Reflect.deleteProperty(user, 'passwordHash');
    return {
      payload: {
        ...user,
      },
      token: jwt.sign({ ...user }, 'jwtSecretKey', {
        expiresIn: '1d',
      }),
    };
  }
  static async buscarUsuario(userID?: number,
    name?: number,
    email?: string,) {
    let whereCondition: any = {};

    if (userID) {
      Object.assign(whereCondition, userID);
    }
    if (name) {
      Object.assign(whereCondition, name);
    }
    if (email) {
      Object.assign(whereCondition, email);
    }

    try {
      const result = await Usuario.findAll({ where: whereCondition });
      return result;
    } catch (error) {
      throw new GenericException({ name: "userNotFound", message: "User with where conditions not found", statusCode: 404 });
    }
  }
  static async deletarUsuario(
    userID: string,
  ): Promise<number> {
    return Usuario.destroy({ where: { userID } })
  }
}
