import DespesaRepository from "../repositories/DespesaRepository";
import { HttpError } from "../utils/httpError";

export default class DespesaService {
  static async criarDespesa(
    descricao: string,
    valor: number,
    data_vencimento: Date,
    status: boolean = false
  ) {
    return DespesaRepository.criarDespesa(descricao, valor, data_vencimento, status);
  }

  static async buscarDespesa(descricao?: string) {
    return DespesaRepository.buscarDespesa(descricao);
  }

  static async acessarDespesa(despesaId: number) {
    const despesa = await DespesaRepository.acessarDespesa(despesaId);
    if (!despesa) {
      throw new HttpError(404, "Despesa não encontrada");
    }
    return despesa;
  }

  static async atualizarDespesa(
    despesaId: number,
    updateInfo: Record<string, any>
  ) {
    await this.acessarDespesa(despesaId);
    await DespesaRepository.atualizarDespesa(despesaId, updateInfo);

    return await this.acessarDespesa(despesaId);
  }

  static async deletarDespesa(despesaId: number) {
    await this.acessarDespesa(despesaId);
    return await DespesaRepository.deletarDespesa(despesaId);
  }

  static async buscarDespesasPorIntervalo(
    dataCriacao?: Date,
    dataVencimento?: Date,
    status?: boolean
  ) {
    return DespesaRepository.buscarDespesasPorIntervalo(dataCriacao, dataVencimento, status);
  }
}
