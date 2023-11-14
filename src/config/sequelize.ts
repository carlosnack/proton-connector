import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql', 'root', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;