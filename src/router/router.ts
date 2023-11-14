import express from 'express';
import EstoqueController from '../controllers/EstoqueController';

const router = express.Router();

router.get('/estoque', EstoqueController.buscarEstoque);
router.delete('/estoque/delete', EstoqueController.deletarEstoque);
router.post('/estoque', EstoqueController.criarRegistroDeEstoque);

export default router;
