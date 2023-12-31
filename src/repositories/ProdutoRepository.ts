import { Op } from "sequelize";
import Produto from "../models/Produto";

export default class ProdutoRepository {
  static async criarProduto(
    nome: string,
    descricao: string,
    preco: number
  ): Promise<Produto> {
    return await Produto.create({ nome, descricao, preco });
  }

  static async buscarProduto(nome?: string): Promise<Produto[]> {
    const condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : {};

    return await Produto.findAll({ where: condition });
  }

  static async acessarProduto(produtoId: number): Promise<Produto | null> {
    const produto = await Produto.findByPk(produtoId);

    return produto;
  }

  static async atualizarProduto(
    produtoId: number,
    updateInfo: Partial<Produto>
  ): Promise<number> {
    const [affectedRows] = await Produto.update(updateInfo, {
      where: { produtoId },
    });

    return affectedRows;
  }

  static async buscarProdutosIds(produtosIds: number[]): Promise<Produto[]> {
    return await Produto.findAll({
      where: { produtoId: { [Op.in]: produtosIds } },
    });
  }
}
