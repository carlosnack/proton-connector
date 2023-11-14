# Projeto Proton Connector

Este é um projeto Proton Connector desenvolvido em Node.js e TypeScript, utilizando o Sequelize como ORM para interação com o banco de dados MySQL.

## Requisitos

- Node.js ([Instalar Node.js](https://nodejs.org/))
- Docker ([Instalar Docker](https://www.docker.com/))
- Docker Compose ([Instalar Docker Compose](https://docs.docker.com/compose/))

## Configuração do Banco de Dados

### Inicialização do Docker Compose

Em seguida, execute o seguinte comando para iniciar os contêineres definidos no arquivo docker-compose.yml:

docker-compose up -d

Executando o Projeto
Para iniciar o servidor, execute:

npm run dev

O servidor estará acessível em http://localhost:3000.