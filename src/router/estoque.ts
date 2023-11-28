import { Router } from "express";
import { query } from "../utils/requestsValidations";
import { buscarEstoqueValidation } from "../validations/EstoqueValidation";
import EstoqueController from "../controllers/EstoqueController";

const router = Router();

router.get(
  "/estoque",
  query(buscarEstoqueValidation),
  EstoqueController.buscarEstoque
);
router.delete("/estoque", EstoqueController.deletarEstoque);
router.post("/estoque", EstoqueController.criarRegistroDeEstoque);

export default router;
