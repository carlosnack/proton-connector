import { Router } from "express";
import { body } from "../utils/requestsValidations";
import { criarVendaValidation } from "../validations/VendaValidation";
import { endpoint } from "../utils/endpoint";
import VendaController from "../controllers/VendaController";

const router = Router();

router.post(
  "/vendas",
  body(criarVendaValidation),
  endpoint(VendaController.criarVenda)
);

router.get(
  "/vendas",
  endpoint(VendaController.buscarVendas)
);

export default router;
