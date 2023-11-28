import NotaFiscalRepository, {
  UpdateNotaFiscalProps,
} from "../repositories/NotaFiscalRepository";

export default class NotaFiscalService {
  static async criarNotaFiscal(valor: number, dataEmissao: Date) {
    return NotaFiscalRepository.criarNotaFiscal(valor, dataEmissao);
  }

  static async atualizarNotaFiscal(
    notaFiscalId: number,
    { status }: UpdateNotaFiscalProps
  ) {
    return NotaFiscalRepository.atualizarNotaFiscal(notaFiscalId, { status });
  }
}
