import ProdutoRepository from "../repositories/ProdutoRepository";
import { HttpError } from "../utils/httpError";

export default class ProdutoService {
  static async criarProduto(nome: string, descricao: string, preco: number) {
    return ProdutoRepository.criarProduto(nome, descricao, preco);
  }

  static async buscarProduto(nome?: string) {
    return ProdutoRepository.buscarProduto(nome);
  }

  static async acessarProduto(produtoId: number) {
    const produto = await ProdutoRepository.acessarProduto(produtoId);
    if (!produto) {
      throw new HttpError(404, "Produto não encontrado");
    }
    return produto;
  }

  static async atualizarProduto(
    produtoId: number,
    updateInfo: Record<string, any>
  ) {
    await this.acessarProduto(produtoId);
    await ProdutoRepository.atualizarProduto(produtoId, updateInfo);

    return await this.acessarProduto(produtoId);
  }
}
