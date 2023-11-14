import Usuario from '../models/Usuario'

export default class UsuarioRepository {
  static async criarRegistroDeUsuario(
    produtoId: number,
    quantidade: number,
    estoqueId: string,
  ): Promise<Usuario> {
    return await Usuario.create({ produtoId, quantidade, estoqueId })
  }
  static async buscarUsuarioPorIds(estoqueId?: string, produtoId?: number) {
    let whereCondition: any = {};

    if (estoqueId && produtoId) {
      whereCondition = {
        estoqueId,
        produtoId,
      }
    } else if (estoqueId) {
      whereCondition = { estoqueId }
    } else if (produtoId) {
      whereCondition = { produtoId }
    }

    try {
      const result = await Usuario.findAll({ where: whereCondition })
      return result
    } catch (error) {
      throw new Error(`Erro ao buscar estoque: ${error}`)
    }
  }

  // Deleta uma venda do banco de dados
  static async deletarUsuario(
    estoqueId: string,
    produtoId: number,
  ): Promise<number> {
    return Usuario.destroy({ where: { estoqueId, produtoId } })
  }

  // Outras operações relacionadas à entidade "Venda" podem ser adicionadas aqui
}
