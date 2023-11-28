import Joi from "joi";
import { PagamentoStatusEnum } from "../models/Pagamento";

export const acessarPagamentoValidation = Joi.object({
  token: Joi.string().required(),
}).required();

export const buscarPagamentoValidation = Joi.object({
  status: Joi.string().valid(...Object.values(PagamentoStatusEnum)),
}).required();
