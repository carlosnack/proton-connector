import express from 'express'
import EstoqueController from '../controllers/EstoqueController'
import { query } from '../utils/requestsValidations'
import { buscarEstoqueValidation } from '../validations/EstoqueValidation'
import UsuarioController from '../controllers/UsuarioController'

const router = express.Router()

router.post('/usuario', UsuarioController.criarRegistroDeUsuario)
router.post('/usuario/auth', UsuarioController.signIn)

export default router
