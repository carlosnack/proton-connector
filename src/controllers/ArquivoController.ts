import { Request, Response } from "express";
import ArquivoService from "../services/ArquivoService";

export default class ArquivoController {
  static async acessarArquivo(req: Request, res: Response) {
    const { arquivoId } = req.params as Record<string, any>;

    const { arquivo, arquivoInfo, arquivoFound } =
      await ArquivoService.acessarArquivo(arquivoId);

    res.setHeader("Content-Length", arquivoInfo.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${arquivoFound.nome}`
    );

    return arquivo.pipe(res);
  }
}
