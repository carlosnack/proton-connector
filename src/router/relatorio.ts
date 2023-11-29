import { Router } from "express";
import { query } from "../utils/requestsValidations";
import { relatorioFaturamentoValidation } from "../validations/RelatorioValidation";
import RelatorioController from "../controllers/RelatorioController";
import { endpoint } from "../utils/endpoint";

const router = Router();

router.get(
  "/relatorios/faturamento",
  query(relatorioFaturamentoValidation),
  endpoint(RelatorioController.relatorioFaturamento)
);

export default router;
