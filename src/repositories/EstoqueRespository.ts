import Estoque from '../models/Estoque';

export default class VendaRepository {
  // Cria uma nova venda no banco de dados
  static async criarRegistroDeEstoque(produtoId: number, quantidade: number, estoqueId: string): Promise<Estoque> {
    return await Estoque.create({ produtoId, quantidade, estoqueId});
  }
  static async buscarEstoquePorIds(estoqueId?: string, produtoId?: number) {
    let whereCondition: any = {};
  
    if (estoqueId && produtoId) {
      whereCondition = {
        estoqueId,
        produtoId,
      };
    } else if (estoqueId) {
      whereCondition = { estoqueId };
    } else if (produtoId) {
      whereCondition = { produtoId };
    }
  
    try {
      const result = await Estoque.findAll({ where: whereCondition });
      return result;
    } catch (error) {
      throw new Error(`Erro ao buscar estoque: ${error}`);
    }
  }

  // Deleta uma venda do banco de dados
  static async deletarEstoque(estoqueId: string, produtoId: number): Promise<number> {
    return Estoque.destroy({ where: { estoqueId, produtoId} });
  }

  // Outras operações relacionadas à entidade "Venda" podem ser adicionadas aqui
}