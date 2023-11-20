import Usuario from '../models/Usuario'

export default class UsuarioRepository {
  static async criarRegistroDeUsuario(
    userID: number,
    name: number,
    password: string,
    passwordHash: string,
    email: string,
  ): Promise<Usuario> {
    return await Usuario.create({
      userID,
      name,
      password,
      passwordHash,
      email,
    })
  }
  static async signIn(
    password: string,
    email: string) {


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
      const result = await Usuario.findAll({ where: whereCondition })
      return result
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`)
    }
  }
  static async deletarUsuario(
    userID: string,
  ): Promise<number> {
    return Usuario.destroy({ where: { userID } })
  }
}
