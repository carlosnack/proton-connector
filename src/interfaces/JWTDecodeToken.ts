import Usuario from "../models/Usuario";

export interface JWTDecodedToken extends Usuario {
    exp?: number;
    iat?: number;
}