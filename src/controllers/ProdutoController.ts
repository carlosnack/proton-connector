import { Request, Response, NextFunction } from "express";
import ProdutoService from "../services/ProdutoService";

export default class ProdutoController {
  static async criarProduto(req: Request, res: Response) {
    const { nome, descricao, preco } = req.body;

    const produto = await ProdutoService.criarProduto(nome, descricao, preco);

    return res.status(201).json(produto);
  }

  static async buscarProdutos(req: Request, res: Response) {
    const { nome } = req.query as Record<string, any>;

    const produtos = await ProdutoService.buscarProduto(nome);

    return res.status(200).json({ produtos });
  }

  static async acessarProduto(req: Request, res: Response) {
    const { produtoId } = req.params as Record<string, any>;
    const produto = await ProdutoService.acessarProduto(produtoId);

    return res.status(200).json(produto);
  }

  static async atualizarProduto(req: Request, res: Response) {
    const { produtoId } = req.params as Record<string, any>;
    const body = req.body as Record<string, any>;

    const produto = await ProdutoService.atualizarProduto(produtoId, body);

    return res.status(200).json(produto);
  }
}
