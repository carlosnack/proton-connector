import { ObjectSchema } from "joi";
import { endpoint } from "./endpoint";
import { HttpError } from "./httpError";
import { messages } from "./joiErrorMessagesPortuguese";

export const createRequestValidate =
  (key: "body" | "params" | "query") => (schema: ObjectSchema) =>
    endpoint(async (req, res, next) => {
      try {
        const value = await schema.validateAsync(req[key], {
          messages: messages,
        });
        req[key] = value;
        next();
      } catch (err: any) {
        throw new HttpError(400, err.message);
      }
    });
