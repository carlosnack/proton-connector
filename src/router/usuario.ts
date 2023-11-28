import express from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = express.Router();

router.post("/usuario", UsuarioController.criarRegistroDeUsuario);
router.post("/usuario/auth", UsuarioController.signIn);

export default router;
