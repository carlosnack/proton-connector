import { Sequelize } from "sequelize";
import Venda from "../models/Venda";

const sequelize = new Sequelize("mysql", "root", "sua_senha", {
  host: "localhost",
  dialect: "mysql",
});


export default sequelize;
