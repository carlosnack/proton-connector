import NotaFiscal from "../models/NotaFiscal";

export default class NotaFiscalRepository {
  static async criarNotaFiscal(
    valor: number,
    dataEmissao: Date
  ): Promise<NotaFiscal> {
    return NotaFiscal.create({ valor, dataEmissao });
  }
}
