import VendaProduto from "../models/VendaProduto";

interface VendaProdutosToInsertProps {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  vendaId: number;
}

export default class VendaProdutoRepository {
  static async criarVendaProdutos(
    vendaProdutosToInsert: VendaProdutosToInsertProps[]
  ): Promise<VendaProduto[]> {
    console.log(vendaProdutosToInsert);
    return await VendaProduto.bulkCreate(vendaProdutosToInsert);
  }
}
