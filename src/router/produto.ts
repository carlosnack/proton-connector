import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import { body, params, query } from "../utils/requestsValidations";
import {
  criarProdutoValidation,
  buscarProdutoValidation,
  acessarProdutoValidation,
  atualizarProdutovalidation,
} from "../validations/ProdutoValidation";
import { endpoint } from "../utils/endpoint";

const router = Router();

router.post(
  "/produtos",
  body(criarProdutoValidation),
  endpoint(ProdutoController.criarProduto)
);

router.get(
  "/produtos",
  query(buscarProdutoValidation),
  endpoint(ProdutoController.buscarProdutos)
);

router.get(
  "/produtos/:produtoId",
  params(acessarProdutoValidation),
  endpoint(ProdutoController.acessarProduto)
);

router.patch(
  "/produtos/:produtoId",
  params(acessarProdutoValidation),
  body(atualizarProdutovalidation),
  endpoint(ProdutoController.atualizarProduto)
);

export default router;
