import { Transaction } from "sequelize";
import VendaProduto from "../models/VendaProduto";
import { SearchPeriodoProps } from "./VendaRepository";
import { Op } from "sequelize";

interface VendaProdutosToInsertProps {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  vendaId: number;
}
interface VendaProdutoBatchInsertResult {
  vendasProdutosCreated: VendaProduto[];
  results: { success: boolean; message?: string }[];
}

export default class VendaProdutoRepository {
  static async criarVendaProdutos(
    vendaProdutosToInsert: VendaProdutosToInsertProps[],
    transaction?: Transaction
  ): Promise<VendaProdutoBatchInsertResult> {
    const vendasProdutosCreated = await VendaProduto.bulkCreate(
      vendaProdutosToInsert,
      { transaction }
    );
    const results = await VendaProduto.baixaEstoque(
      vendasProdutosCreated,
      transaction
    );

    return { vendasProdutosCreated, results };
  }

  static async buscarVendasProdutosPeriodo({
    dataInicio,
    dataFim,
  }: SearchPeriodoProps) {
    const vendasProdutos = await VendaProduto.findAll({
      where: {
        createdAt: {
          [Op.between]: [dataInicio, dataFim],
        },
      },
    });

    return vendasProdutos;
  }
}
