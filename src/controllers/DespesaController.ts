import { Request, Response } from "express";
import DespesaService from "../services/DespesaService";

export default class DespesaController {
  static async criarDespesa(req: Request, res: Response) {
    const { descricao, valor, data_vencimento, status } = req.body;

    const despesa = await DespesaService.criarDespesa(descricao, valor, data_vencimento, status);

    return res.status(201).json(despesa);
  }

  static async buscarDespesas(req: Request, res: Response) {
    const { descricao, dataCriacao, dataVencimento, status } = req.query as Record<string, any>;

    const despesas = await DespesaService.buscarDespesasPorIntervalo(dataCriacao, dataVencimento, status);
    return res.status(200).json({ despesas });
  }

  static async acessarDespesa(req: Request, res: Response) {
    const { despesaId } = req.params as Record<string, any>;
    const despesa = await DespesaService.acessarDespesa(despesaId);

    return res.status(200).json(despesa);
  }

  static async atualizarDespesa(req: Request, res: Response) {
    const { despesaId } = req.params as Record<string, any>;
    const body = req.body as Record<string, any>;

    const despesa = await DespesaService.atualizarDespesa(despesaId, body);

    return res.status(200).json(despesa);
  }

  static async deletarDespesa(req: Request, res: Response) {
    const { despesaId } = req.params as Record<string, any>;

    await DespesaService.deletarDespesa(despesaId);

    return res.status(204).send();
  }
}
