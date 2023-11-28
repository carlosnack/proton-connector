import Joi from "joi";

export const criarProdutoValidation = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  preco: Joi.number().greater(0).required(),
  quantidadeEstoque: Joi.number().required(),
}).required();

export const buscarProdutoValidation = Joi.object({
  nome: Joi.string(),
}).required();

export const acessarProdutoValidation = Joi.object({
  produtoId: Joi.number().required(),
}).required();

export const atualizarProdutovalidation = Joi.object({
  nome: Joi.string(),
  descricao: Joi.string(),
  preco: Joi.number().greater(0),
  deleted: Joi.boolean(),
  quantidadeEstoque: Joi.number(),
}).required();
