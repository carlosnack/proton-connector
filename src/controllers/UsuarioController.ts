import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UsuarioService from "../services/UsuarioService";

export default class UsuarioController {
  static async criarRegistroDeUsuario(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userID, name, password, email, active } = req.query;
    const user = await UsuarioService.criarRegistroDeUsuario(
      userID as any as number,
      name as string,
      password as string,
      email as string,
      active as any as boolean
    );
    return res.status(200).json({ user });
  }
  static async signIn(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, email } = req.query;
    const userLogin = await UsuarioService.signIn(
      password as string,
      email as string
    );
    return res.status(200).json(userLogin);
  }
}
