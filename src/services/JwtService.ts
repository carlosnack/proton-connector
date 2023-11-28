import jwt, { verify } from "jsonwebtoken";
import { HttpError } from "../utils/httpError";

export default class JwtService {
  static generateTokenObject(
    payload: Record<string, any>,
    expiresIn = process.env.TOKEN_LIFE
  ) {
    return jwt.sign(payload, process.env.JWT_SECRET || "jwtSecret", {
      expiresIn,
    });
  }

  static decode<T>(token: string): T {
    try {
      return verify(token, process.env.JWT_SECRET as any) as T;
    } catch (error: any) {
      throw new HttpError(400, error);
    }
  }
}
