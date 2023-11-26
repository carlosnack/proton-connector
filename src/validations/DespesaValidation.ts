import Joi from "joi";

export const criarDespesaValidation = Joi.object({
  descricao: Joi.string().required(),
  valor: Joi.number().greater(0).required(),
  data_vencimento: Joi.date().required(),
  status: Joi.boolean(),
}).required();

export const buscarDespesasValidation = Joi.object({
  descricao: Joi.string(),
  dataCriacao: Joi.date(),
  dataVencimento: Joi.date(),
}).required();

export const acessarDespesaValidation = Joi.object({
  despesaId: Joi.number().required(),
}).required();

export const atualizarDespesaValidation = Joi.object({
  descricao: Joi.string(),
  valor: Joi.number().greater(0),
  data_vencimento: Joi.date(),
  status: Joi.boolean(),
}).required();
