import NotaFiscal, { NotaFiscalStatus } from "../models/NotaFiscal";
export interface UpdateNotaFiscalProps {
  valor?: number;
  dataEmissao?: Date;
  status?: NotaFiscalStatus;
}
export default class NotaFiscalRepository {
  static async criarNotaFiscal(
    valor: number,
    dataEmissao: Date
  ): Promise<NotaFiscal> {
    return NotaFiscal.create({ valor, dataEmissao });
  }

  static async atualizarNotaFiscal(
    notaFiscalId: number,
    { status }: UpdateNotaFiscalProps
  ) {
    return NotaFiscal.update({ status }, { where: { notaFiscalId } });
  }
}
