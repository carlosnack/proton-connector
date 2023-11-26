import { Router } from "express";
import DespesaController from "../controllers/DespesaController";
import { body, params, query } from "../utils/requestsValidations";
import {
  criarDespesaValidation,
  buscarDespesasValidation,
  acessarDespesaValidation,
  atualizarDespesaValidation,
} from "../validations/DespesaValidation";
import { endpoint } from "../utils/endpoint";

const router = Router();

router.post(
  "/despesas",
  body(criarDespesaValidation),
  endpoint(DespesaController.criarDespesa)
);

router.get(
  "/despesas",
  query(buscarDespesasValidation),
  endpoint(DespesaController.buscarDespesas)
);

router.get(
  "/despesas/:despesaId",
  params(acessarDespesaValidation),
  endpoint(DespesaController.acessarDespesa)
);

router.patch(
  "/despesas/:despesaId",
  params(acessarDespesaValidation),
  body(atualizarDespesaValidation),
  endpoint(DespesaController.atualizarDespesa)
);

router.delete(
  "/despesas/:despesaId",
  params(acessarDespesaValidation),
  endpoint(DespesaController.deletarDespesa)
);

router.get(
    "/despesas/:status",
    endpoint(DespesaController.calcularTotal)
  );

export default router;
