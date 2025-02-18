# 🚀 API NestJS com PostgreSQL e Docker

Esta é uma API desenvolvida com **NestJS** e **PostgreSQL** utilizando **Docker** para gerenciamento do banco de dados. A API está documentada com **Swagger** e implementa autenticação via **JWT**.

## 📌 Tecnologias utilizadas

- [NestJS](https://nestjs.com/) - Framework para Node.js
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Docker](https://www.docker.com/) - Containerização do banco
- [TypeORM](https://typeorm.io/) - ORM para integração com o banco
- [Swagger](https://swagger.io/) - Documentação da API
- [JWT](https://jwt.io/) - Autenticação baseada em tokens
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de senhas

## 📦 Instalação

1️⃣ Clone este repositório:

```bash
git clone https://github.com/lucasadsr/nest-task-api.git
cd nest-task-api
```

2️⃣ Instale as dependências:

```bash
npm install
```

3️⃣ Configure as variáveis de ambiente criando um arquivo `.env` baseado no `.env.example`:

```env
JWT_SECRET=
JWT_EXPIRATION_TIME=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

## 🐳 Configuração do Banco de Dados com Docker

Para rodar o banco de dados via Docker, execute:

```bash
docker-compose up -d
```

## 🚀 Executando a API

Inicie a aplicação em **modo de desenvolvimento**:

```bash
npm run start:dev
```

Para rodar em **modo de produção**:

```bash
npm run build
npm run start:prod
```

## 📖 Documentação

A API está documentada com Swagger. Após rodar o projeto, acesse:

📌 [**http://localhost:3000/api**](http://localhost:3000/api)

## 🔑 Autenticação

A API utiliza **JWT** para autenticação. Para acessar rotas protegidas:

1️⃣ Faça login e obtenha um token via **POST **``.\
2️⃣ Use esse token no header das requisições:

```http
Authorization: Bearer SEU_TOKEN
```

## 🛠 Estrutura do Projeto

```
src/
│-- auth/              # Módulo de autenticação
│-- db/                # Configuração do banco de dados
│-- tasks/             # Módulo de tarefas
│-- users/             # Módulo de usuários
│-- main.ts            # Arquivo principal
│-- app.controller.ts  # Controller raiz
│-- app.module.ts      # Módulo raiz
```

## 📜 Licença

Este projeto está sob a licença **MIT**.

