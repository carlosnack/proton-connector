// controller/EstoqueController.ts
import { Request, Response } from 'express';
import EstoqueService from '../services/EstoqueService'; // Importe o serviço EstoqueService corretamente

export default class EstoqueController {
    //PARA EU DO FUTURO: REVISAR RETORNOS DE ERROS
  static async buscarEstoque(req: Request, res: Response) {
    const estoqueId = req.query.estoqueId as string;
    const produtoId = req.query.produtoId as any as number;
    try {
      const resultado = await EstoqueService.buscarEstoquePorIds(estoqueId, produtoId);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoque' });
    }
  }

  static async deletarEstoque(req: Request, res: Response) {
    const estoqueId = req.query.estoqueId as string;
    const produtoId = req.query.produtoId as any as number;

    try {
        const resultado = await EstoqueService.deletarEstoque(produtoId, estoqueId);
        res.json(resultado);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estoque' });
      }
  }

  static async criarRegistroDeEstoque(req: Request, res: Response) {

    const estoqueId = req.query.estoqueId  as string;
    const produtoId = req.query.produtoId as any as number;
    const quantidade = req.query.quantidade  as any as number;

    try {
        const resultado = await EstoqueService.criarRegistroDeEstoque(produtoId, quantidade,  estoqueId);
        res.json(resultado);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estoque' });
      }

  }

  // Outras funções do controlador relacionadas ao Estoque podem ser adicionadas aqui
}