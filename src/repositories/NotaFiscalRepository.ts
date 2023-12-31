import { Transaction } from "sequelize";
import NotaFiscal, { NotaFiscalStatus } from "../models/NotaFiscal";
export interface UpdateNotaFiscalProps {
  valor?: number;
  dataEmissao?: Date;
  arquivoId?: number;
  status?: NotaFiscalStatus;
}
export default class NotaFiscalRepository {
  static async criarNotaFiscal(
    valor: number,
    dataEmissao: Date,
    transaction?: Transaction
  ): Promise<NotaFiscal> {
    return NotaFiscal.create({ valor, dataEmissao }, { transaction });
  }

  static async atualizarNotaFiscal(
    notaFiscalId: number,
    { status, dataEmissao, arquivoId }: UpdateNotaFiscalProps
  ) {
    return NotaFiscal.update(
      { status, dataEmissao, arquivoId },
      { where: { notaFiscalId } }
    );
  }
}
