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
  // TODO add cliente email to efetuar pagamento body to ensure that person who's acessing the link is the right client
  static async efetuarPagamento(req: Request, res: Response) {
    const { token } = req.params as Record<string, any>;
    const decoded = JwtService.decode<PagamentoTokenProps>(token);

    const [_, [pagamentoObject]] = await PagamentoService.efetuarPagamento(
      decoded.pagamentoId,
      PagamentoStatusEnum.APROVADO,
      new Date()
    );

    return res.status(200).json({
      message: "Pagamento realizado com sucesso",
      pagamento: pagamentoObject.dataValues,
    });
  }

  // TODO: Trazer a venda ao acessar o pagamento
  static async acessarPagamento(req: Request, res: Response) {
    const { token } = req.params as Record<string, any>;
    const decoded = JwtService.decode<PagamentoTokenProps>(token);

    const pagamento = await PagamentoService.acessarPagamento(
      decoded.pagamentoId
    );

    return res.status(209).json(pagamento);
  }
  static async buscarPagamentos(req: Request, res: Response) {
    const { status } = req.query as Record<string, any>;

    const pagamentos = await PagamentoService.buscarPagamento(status);

    return res.status(501).json({ pagamentos });
  }
}