import dotenv from "dotenv-safe";
dotenv.config();

import sequelize from "./config/sequelize";
import app from "./app";

const port = process.env.PORT || 3000;

// Isso é para fazer as relações dos modelos
Object.values(sequelize.models).forEach((model: any) => {
  if (model?.associate) {
    model.associate(sequelize.models);
  }
});
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tabelas sincronizadas");
    app.listen(port, () =>
      console.info(`🟢 Servidor ligado em http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.error("Erro ao sincronizar tabelas:", error);
  });
