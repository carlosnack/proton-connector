import ProdutoRepository from "../repositories/ProdutoRepository";
import { HttpError } from "../utils/httpError";
import EstoqueService from "./EstoqueService";

export default class ProdutoService extends EstoqueService {
  static async criarProduto(
    nome: string,
    descricao: string,
    preco: number,
    quantidadeEstoque: number
  ) {
    const produtoCreated = await ProdutoRepository.criarProduto(
      nome,
      descricao,
      preco
    );
    await this.criarRegistroDeEstoque(
      produtoCreated.produtoId,
      quantidadeEstoque
    );

    return produtoCreated;
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
    updateInfo: Record<string, any>,
    quantidadeEstoque?: number
  ) {
    const produto = await this.acessarProduto(produtoId);
    await ProdutoRepository.atualizarProduto(produtoId, updateInfo);

    if (quantidadeEstoque) {
      await this.atualizarEstoque(produto.produtoId, quantidadeEstoque);
    }

    return produto.reload();
  }
}
