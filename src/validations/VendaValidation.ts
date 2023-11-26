import Joi from "joi";
import { PagamentoMetodoEnum } from "../models/Pagamento";

export const criarVendaValidation = Joi.object({
  clienteId: Joi.number().required(),
  produtos: Joi.array().items({
    produtoId: Joi.number().required(),
    quantidade: Joi.number().greater(0).required(),
  }),
  pagamento: Joi.object({
    metodo: Joi.string().valid(...Object.values(PagamentoMetodoEnum)),
  }).required(),
}).required();
