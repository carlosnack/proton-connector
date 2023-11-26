import NotaFiscalRepository from "../repositories/NotaFiscalRepository";

export default class NotaFiscalService {
  static async criarNotaFiscal(valor: number, dataEmissao: Date) {
    return await NotaFiscalRepository.criarNotaFiscal(valor, dataEmissao);
  }
}
