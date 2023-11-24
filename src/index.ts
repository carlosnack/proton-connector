import express from "express";
import sequelize from "./config/sequelize";
import cors from "cors";
import { json } from "body-parser";
import { exception } from "./utils/exception";
import { notFound } from "./utils/notFound";
import { readdirSync } from "fs";
import { join } from "path";
import app from "./app";

const port = 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas");
    app.listen(port, () =>
      console.info(`🟢 Servidor ligado em http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.error("Erro ao sincronizar tabelas:", error);
  });
