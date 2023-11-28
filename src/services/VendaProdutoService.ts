import { Transaction } from "sequelize";
import Produto from "../models/Produto";
import VendaProdutoRepository from "../repositories/VendaProdutoRepository";
import { HttpError } from "../utils/httpError";
import { SearchPeriodoProps } from "../repositories/VendaRepository";
type Produtos<T> = Partial<T> & { quantidade: number };

export default class VendaProdutoService {
  static async criarVendaProdutos(
    vendaId: number,
    produtos: Produtos<Produto>[],
    transaction?: Transaction
  ) {
    const vendaProdutosParaInserir = produtos.map((produto) => ({
      produtoId: produto.produtoId!,
      quantidade: produto.quantidade!,
      precoUnitario: produto.preco!,
      vendaId: vendaId,
    }));

    const { results } = await VendaProdutoRepository.criarVendaProdutos(
      vendaProdutosParaInserir,
      transaction
    );

    const filtered = results.filter((result) => !result.success);

    if (filtered.length > 0) {
      throw new HttpError(
        400,
        `Não foi possível realizar a venda`,
        filtered as any
      );
    }
  }

  static async buscarVendasProdutosPeriodo({
    dataInicio,
    dataFim,
  }: SearchPeriodoProps) {
    return VendaProdutoRepository.buscarVendasProdutosPeriodo({
      dataInicio,
      dataFim,
    });
  }
}
