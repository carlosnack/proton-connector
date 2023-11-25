import Joi from "joi";

export const criarClienteValidation = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  cnpj: Joi.string().required(),
  cpf: Joi.string().required(),
  cep: Joi.string().required(),
  endereco: Joi.string().required(),
  numero: Joi.string().required(),
}).required();

export const buscarClienteValidation = Joi.object({
  nome: Joi.string(),
  cnpj: Joi.string(),
}).required();

export const acessarClienteValidation = Joi.object({
  clienteId: Joi.number().required(),
}).required();

export const atualizarClientevalidation = Joi.object({
  nome: Joi.string(),
  email: Joi.string().email(),
  cnpj: Joi.string(),
  cpf: Joi.string(),
  cep: Joi.string(),
  endereco: Joi.string(),
  numero: Joi.string(),
  deleted: Joi.bool(),
}).required();
