import Estoque from "../models/Estoque";
import Produto from "../models/Produto";

export default class EstoqueRepository {
  static async criarRegistroDeEstoque(
    produtoId: number,
    quantidade: number
  ): Promise<Estoque> {
    return await Estoque.create({ produtoId, quantidade });
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
      const result = await Estoque.findAll({
        where: whereCondition,
        include: [
          {
            model: Produto,
            as: "produto",
          },
        ],
      });
      return result;
    } catch (error) {
      throw new Error(`Erro ao buscar estoque: ${error}`);
    }
  }

  static async atualizarEstoque(produtoId: number, quantidade: number) {
    const [affectedRows] = await Estoque.update(
      { quantidade },
      {
        where: { produtoId },
      }
    );

    return affectedRows;
  }
  static async deletarEstoque(
    estoqueId: string,
    produtoId: number
  ): Promise<number> {
    return Estoque.destroy({ where: { estoqueId, produtoId } });
  }
}
