import Produto from "../models/Produto";
import VendaProdutoRepository from "../repositories/VendaProdutoRepository";
type Produtos<T> = Partial<T> & { quantidade: number };

export default class VendaProdutoService {
  static async criarVendaProdutos(
    vendaId: number,
    produtos: Produtos<Produto>[]
  ) {
    const vendaProdutosParaInserir = produtos.map((produto) => ({
      produtoId: produto.produtoId!,
      quantidade: produto.quantidade!,
      precoUnitario: produto.preco!,
      vendaId: vendaId,
    }));

    await VendaProdutoRepository.criarVendaProdutos(vendaProdutosParaInserir);
  }
}
