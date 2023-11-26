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


// Isso é para fazer as relações dos modelos
Object.values(sequelize.models).forEach((model: any) => {
  if (model?.associate) {
    model.associate(sequelize.models);
  }
});
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
