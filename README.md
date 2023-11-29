# Projeto Proton Connector

Este é um projeto Proton Connector desenvolvido em Node.js e TypeScript, utilizando o Sequelize como ORM para interação com o banco de dados MySQL.

## Requisitos

- Node.js ([Instalar Node.js na versão 18](https://nodejs.org/))
- Yarn ([Instalar yarn](https://yarnpkg.com/))
- Docker ([Instalar Docker](https://www.docker.com/))
- Docker Compose ([Instalar Docker Compose](https://docs.docker.com/compose/))

## Configuração do Banco de Dados

### Inicialização do Docker Compose

Em seguida, execute o seguinte comando para iniciar os contêineres definidos no arquivo docker-compose.yml:

```bash
docker-compose up -d
```

## Executando o Projeto

Para rodar o projeto você deve utilizar os seguintes comandos em sequencia

```bash
yarn install

yarn build

yarn start
```
