import express from 'express'
import EstoqueController from '../controllers/EstoqueController'
import { query } from '../utils/requestsValidations'
import { buscarEstoqueValidation } from '../validations/EstoqueValidation'

const router = express.Router()

router.get('/estoque', query(buscarEstoqueValidation), EstoqueController.buscarEstoque)
router.delete('/estoque/delete', EstoqueController.deletarEstoque)
router.post('/estoque', EstoqueController.criarRegistroDeEstoque)

export default router
