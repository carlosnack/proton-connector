import { Router } from "express";
import { body, params, query } from "../utils/requestsValidations";
import { acessarClienteValidation, atualizarClientevalidation, buscarClienteValidation, criarClienteValidation } from "../validations/ClienteValidation";
import { endpoint } from "../utils/endpoint";
import ClienteController from "../controllers/ClienteController";

const router = Router();

router.post(
  "/clientes",
  body(criarClienteValidation),
  endpoint(ClienteController.criarCliente)
);

router.get(
  "/clientes",
  query(buscarClienteValidation),
  endpoint(ClienteController.buscarClientes)
);

router.get(
  "/clientes/:clienteId",
  params(acessarClienteValidation),
  endpoint(ClienteController.acessarCliente)
);

router.patch(
  "/clientes/:clienteId",
  params(acessarClienteValidation),
  body(atualizarClientevalidation),
  endpoint(ClienteController.atualizarCliente)
);

export default router;
