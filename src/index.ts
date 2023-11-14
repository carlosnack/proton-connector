import express from 'express'
import router from './router/router'
import sequelize from './config/sequelize'

const app = express()
const port = 3000
app.use('/api', router) // Use o controlador para a rota '/api/estoque'

sequelize
  .sync()
  .then(() => {
    console.log('Tabelas sincronizadas')
    app.listen(process.env.PORT, () => {
      console.log('Servidor rodando na porta 3000')
    })
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
    process.exit(1);
  })
