import { Request, Response } from "express";
import ClienteService from "../services/ClienteService";

export default class ClienteController {
  static async criarCliente(req: Request, res: Response) {
    const body = req.body as any;

    const cliente = await ClienteService.criarCliente(body);

    return res.status(201).json(cliente);
  }
  static async buscarClientes(req: Request, res: Response) {
    const { nome, cnpj } = req.query as Record<string, any>;

    const clientes = await ClienteService.buscarCliente(nome, cnpj);

    res.status(200).json({ clientes });
  }
  static async acessarCliente(req: Request, res: Response) {
    const { clienteId } = req.params as Record<string, any>;
    const cliente = await ClienteService.acessarCliente(clienteId);

    return res.status(200).json(cliente);
  }
  static async atualizarCliente(req: Request, res: Response) {
    const { clienteId } = req.params as Record<string, any>;
    const body = req.body as Record<string, any>;

    const cliente = await ClienteService.atualizarCliente(clienteId, body);

    return res.status(200).json(cliente);
  }
}
