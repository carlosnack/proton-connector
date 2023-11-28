import Joi from "joi";

export const acessarArquivoValidation = Joi.object({
  arquivoId: Joi.number().required(),
}).required();
