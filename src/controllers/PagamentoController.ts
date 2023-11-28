import { Request, Response } from "express";
import JwtService from "../services/JwtService";
import PagamentoService from "../services/PagamentoService";
import { PagamentoStatusEnum } from "../models/Pagamento";
import VendaService from "../services/VendaService";

interface PagamentoTokenProps {
  clienteId: number;
  email: string;
  nome: string;
  pagamentoId: number;
  vendaId: number;
}

export default class PagamentoController {
  static async efetuarPagamento(req: Request, res: Response) {
    const { token } = req.params as Record<string, any>;
    const decoded = JwtService.decode<PagamentoTokenProps>(token);

    const venda = await PagamentoService.efetuarPagamento(
      decoded.pagamentoId,
      PagamentoStatusEnum.APROVADO,
      new Date(),
      decoded.vendaId
    );

    return res.status(200).json({
      message: "Pagamento realizado com sucesso",
      venda,
    });
  }

  static async acessarPagamento(req: Request, res: Response) {
    const { token } = req.params as Record<string, any>;
    const decoded = JwtService.decode<PagamentoTokenProps>(token);

    const dadosVenda = await VendaService.acessarVenda(decoded.vendaId);

    return res.status(209).json(dadosVenda);
  }
  static async buscarPagamentos(req: Request, res: Response) {
    const { status } = req.query as Record<string, any>;

    const pagamentos = await PagamentoService.buscarPagamento(status);

    return res.status(501).json({ pagamentos });
  }
}
