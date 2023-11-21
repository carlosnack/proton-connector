import { JWTDecodedToken } from "../interfaces/JWTDecodeToken";
import * as jwt from "jsonwebtoken"

export const decodeToken = (jwtToken: string): JWTDecodedToken => {
    return jwt.decode(jwtToken.replace("Bearer ", "")) as any;
  };