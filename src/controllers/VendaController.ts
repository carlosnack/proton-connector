import { Request, Response } from "express";
import VendaService from "../services/VendaService";

export default class VendaController {
  static async criarVenda(req: Request, res: Response) {
    const { clienteId, produtos, pagamento } = req.body as Record<string, any>;

    const { venda, valorTotal } = await VendaService.criarVenda(
      clienteId,
      produtos,
      pagamento
    );
    return res.status(201).json({ ...venda.toJSON(), valorTotal });
  }

  static async buscarVendas(req: Request, res: Response) {
    const vendas = await VendaService.buscarVenda();

    return res.status(200).json({ vendas });
  }
}
