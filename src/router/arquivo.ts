import { Router } from "express";
import { params } from "../utils/requestsValidations";
import { acessarArquivoValidation } from "../validations/ArquivoValidation";
import ArquivoController from "../controllers/ArquivoController";
import { endpoint } from "../utils/endpoint";

const router = Router();

router.get(
  "/arquivos/:arquivoId",
  params(acessarArquivoValidation),
  endpoint(ArquivoController.acessarArquivo)
);

export default router;
