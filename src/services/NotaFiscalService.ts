import { PDFDocument } from "pdf-lib";
import NotaFiscalRepository, {
  UpdateNotaFiscalProps,
} from "../repositories/NotaFiscalRepository";
import { NotaFiscalStatus } from "../models/NotaFiscal";

interface GerarPdfNotaFiscalProps {
  nomeCliente: string;
  dataEmissao: Date;
  notaId: number;
  // TODO change produtos array type
  produtos: any[];
  valorTotal: number;
}

export default class NotaFiscalService {
  static async criarNotaFiscal(valor: number, dataEmissao: Date) {
    return NotaFiscalRepository.criarNotaFiscal(valor, dataEmissao);
  }

  /**
   * TODO: Save NF file
   */
  static async gerarPdfNotaFiscal({
    nomeCliente,
    dataEmissao,
    notaId,
    produtos,
    valorTotal,
  }: GerarPdfNotaFiscalProps) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText("----- Nota Fiscal -----", {
      x: 50,
      y: height - 50,
      size: fontSize,
    });
    page.drawText(`Cliente: ${nomeCliente}`, {
      x: 50,
      y: height - 70,
      size: fontSize,
    });
    page.drawText(`Data de Emissão: ${dataEmissao.toLocaleString("pt-BR")}`, {
      x: 50,
      y: height - 90,
      size: fontSize,
    });
    page.drawText(`Número da Nota: ${notaId}`, {
      x: 50,
      y: height - 110,
      size: fontSize,
    });
    page.drawText("\nProdutos:", { x: 50, y: height - 140, size: fontSize });

    let yPosition = height - 190;
    produtos.forEach((produto, index) => {
      page.drawText(
        `${index + 1}. ${produto.nome} - R$ ${produto.preco} Qtd. ${
          produto.quantidade
        }`,
        { x: 50, y: yPosition, size: fontSize }
      );
      yPosition -= 20;
    });

    const valorTotalY = yPosition - 20;
    page.drawText(`\nValor Total: R$ ${valorTotal}`, {
      x: 50,
      y: valorTotalY,
      size: fontSize,
    });

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

  static async atualizarNotaFiscal(
    notaFiscalId: number,
    { status, dataEmissao, arquivoId }: UpdateNotaFiscalProps
  ) {
    return NotaFiscalRepository.atualizarNotaFiscal(notaFiscalId, {
      status,
      dataEmissao,
      arquivoId,
    });
  }
}
