import Joi from "joi";

export const buscarEstoqueValidation = Joi.object({
  estoqueId: Joi.string(),
  produtoId: Joi.string(),
}).required();
