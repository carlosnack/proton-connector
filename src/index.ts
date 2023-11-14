import express from "express";
import router from "./router/router";
import sequelize from "./config/sequelize";
import cors from "cors";
import { json } from "body-parser";
import { exception } from "./utils/exception";
import { notFound } from "./utils/notFound";

const app = express();
app.use(cors());
app.use(json());

const port = 3000;
app.use("/api", router); // Use o controlador para a rota '/api/estoque'

app.use(exception);
app.use(notFound);
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