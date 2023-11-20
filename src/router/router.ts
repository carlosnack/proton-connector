import express from 'express'
import EstoqueController from '../controllers/EstoqueController'
import { query } from '../utils/requestsValidations'
import { buscarEstoqueValidation } from '../validations/EstoqueValidation'
import UsuarioController from '../controllers/UsuarioController'

const router = express.Router()

router.get('/estoque', query(buscarEstoqueValidation), EstoqueController.buscarEstoque)
router.delete('/estoque/delete', EstoqueController.deletarEstoque)
router.post('/estoque', EstoqueController.criarRegistroDeEstoque)
router.post('/usuario', UsuarioController.criarRegistroDeUsuario)

export default router
