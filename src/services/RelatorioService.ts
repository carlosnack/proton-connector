import { SearchPeriodoProps } from "../repositories/VendaRepository";
import DespesaService from "./DespesaService";
import VendaProdutoService from "./VendaProdutoService";
import VendaService from "./VendaService";

export default class RelatorioService {
  static async gerarRelatorioFaturamento({
    dataInicio,
    dataFim,
  }: SearchPeriodoProps) {
    const vendasProdutos =
      await VendaProdutoService.buscarVendasProdutosPeriodo({
        dataInicio,
        dataFim,
      });
    console.log({ vendasProdutos });
    const vendasProdutoFormated = vendasProdutos.map((vendaProduto) => ({
      quantidade: vendaProduto.quantidade,
      preco: vendaProduto.precoUnitario,
    }));

    const vendasSum = VendaService.somarPrecos(vendasProdutoFormated);

    const { total: despesasSum } =
      await DespesaService.buscarDespesasPorIntervalo({
        dataInicio,
        dataFim,
      });

    console.log({ vendasSum, despesasSum });
    const faturamentoLiquido = vendasSum - despesasSum;

    return faturamentoLiquido;
  }
}
