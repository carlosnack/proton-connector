// controller/EstoqueController.ts
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import EstoqueService from '../services/EstoqueService'
import { decodeToken } from '../utils/decodeToken'

export default class EstoqueController {
  //PARA EU DO FUTURO: REVISAR RETORNOS DE ERROS
  static async buscarEstoque(req: Request, res: Response) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { estoqueId, produtoId } = req.query

    try {
      const resultado = await EstoqueService.buscarEstoquePorIds(
        estoqueId as string,
        produtoId as any as number,
      )
      res.json(resultado)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoque' })
    }
  }

  static async deletarEstoque(req: Request, res: Response) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { estoqueId, produtoId } = req.query

    try {
      const resultado = await EstoqueService.deletarEstoque(
        produtoId as any as number,
        estoqueId as string,
      )
      res.json(resultado)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoque' })
    }
  }

  static async criarRegistroDeEstoque(req: Request, res: Response) {
    const { userID } = decodeToken(req.headers.authorization as string);
    const { estoqueId, produtoId, quantidade } = req.query

    try {
      const resultado = await EstoqueService.criarRegistroDeEstoque(
        produtoId as any as number,
        quantidade as any as number,
        estoqueId as string,
      )
      res.json(resultado)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar estoque' })
    }
  }

  // Outras funções do controlador relacionadas ao Estoque podem ser adicionadas aqui
}
