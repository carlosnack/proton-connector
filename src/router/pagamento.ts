import { Router } from "express";
import { params, query } from "../utils/requestsValidations";
import {
  acessarPagamentoValidation,
  buscarPagamentoValidation,
} from "../validations/PagamentoValidation";
import PagamentoController from "../controllers/PagamentoController";
import { endpoint } from "../utils/endpoint";

const router = Router();

router.post(
  "/pagamentos/:token",
  params(acessarPagamentoValidation),
  endpoint(PagamentoController.efetuarPagamento)
);

router.get(
  "/pagamentos/:token",
  params(acessarPagamentoValidation),
  endpoint(PagamentoController.acessarPagamento)
);

router.get(
  "/pagamentos",
  query(buscarPagamentoValidation),
  endpoint(PagamentoController.buscarPagamentos)
);

export default router;
