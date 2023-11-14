import Joi from "joi";

export const buscarEstoqueValidation = Joi.object({
  estoqueId: Joi.string().required(),
  produtoId: Joi.string().required(),
}).required();
