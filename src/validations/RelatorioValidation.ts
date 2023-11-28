import Joi from "joi";

export const relatorioFaturamentoValidation = Joi.object({
  dataInicio: Joi.date().required(),
  dataFim: Joi.date().required(),
}).required();
