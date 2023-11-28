import { Router } from "express";
import { query } from "../utils/requestsValidations";
import { buscarEstoqueValidation } from "../validations/EstoqueValidation";
import EstoqueController from "../controllers/EstoqueController";
import { endpoint } from "../utils/endpoint";

const router = Router();

router.get(
  "/estoques",
  query(buscarEstoqueValidation),
  endpoint(EstoqueController.buscarEstoque)
);

router.delete("/estoques", endpoint(EstoqueController.deletarEstoque));

export default router;
