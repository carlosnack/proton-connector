import { PassThrough } from "stream";
import UsuarioRepository from "../repositories/UsuarioRepository";

export default class UsuarioService {
    static async criarRegistroDeUsuario(userID: number, name: string, password: string, email: string, active: boolean) {
        return UsuarioRepository.criarRegistroDeUsuario(userID, name, password, email, active);
    }
}