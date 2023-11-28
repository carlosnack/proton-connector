import { Request, Response } from "express";
import RelatorioService from "../services/RelatorioService";

export default class RelatorioController {
  static async relatorioFaturamento(req: Request, res: Response) {
    const { dataInicio, dataFim } = req.query as Record<string, any>;

    const faturamento = await RelatorioService.gerarRelatorioFaturamento({
      dataInicio,
      dataFim,
    });

    return res.status(501).json({ dataInicio, dataFim, faturamento });
  }
}
