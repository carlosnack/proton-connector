import { Sequelize } from "sequelize";

const bdConfig: any = {
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const sequelize = new Sequelize(
  bdConfig.database,
  bdConfig.user,
  bdConfig.password,
  {
    host: "localhost",
    dialect: "postgres",
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

export default sequelize;
