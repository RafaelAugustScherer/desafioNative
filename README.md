# Desafio Native IP Full-stack

O desafio consiste em desenvolver uma aplicação Full-stack para salvar clientes em um banco de dados relacional MySQL e ler/editá-los em um dashboard Front-end React ou Angular.js. Além de outros requisitos técnicos como o uso de Websocket, SOLID, DRY, jsonwebtoken, Pipeline CI, Linter e Testes.

# 🚀 Deploy 🚀

O Deploy da aplicação foi feito no [Heroku](https://www.heroku.com/) utilizando de um Pipeline no [GitHub Actions do repositório](https://github.com/RafaelAugustScherer/desafioNative/actions). Seguem os links de acesso da aplicação:
* **Front-end**: https://desafio-native-front.herokuapp.com/
* **Back-end**: https://desafio-native-back.herokuapp.com/

### Testar Rotas do Back-end
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c74044eca7285c3ff162?action=collection%2Fimport#?env%5BLocal%5D=W3sia2V5Ijoic2VydmVyIiwidmFsdWUiOiJsb2NhbGhvc3Q6MzAwMSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9kZXNhZmlvLW5hdGl2ZS1iYWNrLmhlcm9rdWFwcC5jb20iLCJzZXNzaW9uSW5kZXgiOjB9XQ==)

# 💻 Rodar a aplicação na sua máquina 💻
### Você vai precisar ter instalado
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started/) (Recomendado) ou [MySQL](https://dev.mysql.com/downloads/mysql/)

## 🐋 Rodar com Docker 🐋
<details>
<summary>Instruções</summary>

## Clonar o repositório
Primeiramente você vai precisar clonar este repositório para qualquer diretório em sua máquina local.

Para isso você vai executar o seguinte comando no seu terminal:
```console
git clone https://github.com/RafaelAugustScherer/desafioNative.git
```

## Setup
Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

### Configurar o ambiente (.env)

- **Back-end**
  - Acesse o diretório `./back-end`
  - Altere o arquivo `.env.example` com as variáveis de ambiente indicadas:
  ```
  PORT=3001 // Porta onde a aplicação vai ouvir requisições
  DATABASE_URL="mysql://root:root@esafio-native-db:3306/desafio_native" // URL onde o banco MySQL está rodando (Padrão Docker)
  JWT_SECRET=MySecretJWTSecret // Segredo usado para gerar tokens JWT (qualquer string)
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável
  - Renomeie o arquivo para `.env`
- **Front-end**
  - Acesse o diretório `./front-end`
  - Altere o arquivo `.env.example` com as variáveis de ambiente indicadas:
  ```
  REACT_APP_SERVER=http://localhost:3001 // URL de acesso à API (back-end)
  REACT_APP_WS_SERVER=ws://localhost:3001 // URL de acesso ao WebSocket (mesmo da API)
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável
  - Renomeie o arquivo para `.env`

### Instalar dependências
- Na pasta`./front-end` rode o comando `npm install`

## Inicializar a Aplicação
Inicialize o back-end e o front-end em terminais separados

> Por padrão o back-end inicializa na porta 3001
> Por padrão o front-end inicializa na porta 3000

- Back-end
  - Acesse o diretório `./back-end`
  - Rode o comando `npm run compose:up` para iniciar o banco MySQL e a API Dockerizados
- Front-end
  - Acesse o diretório `./front-end`
  - Rode o comando `npm start` para iniciar a aplicação React

## Acessar a Aplicação
- Back-end:
  - Você pode testar a aplicação via Postman ou Insomnia - URL: `http://localhost:3001`
- Front-end:
  - No seu navegador, use a URL (padrão): `http://localhost:3000`

</details>

## 🐬 Rodar com MySQL 🐬
<details>
<summary>Instruções</summary>

## Clonar o repositório
Primeiramente você vai precisar clonar este repositório para qualquer diretório em sua máquina local.

Para isso você vai executar o seguinte comando no seu terminal:
```console
git clone https://github.com/RafaelAugustScherer/desafioNative.git
```

## Setup
Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

### Configurar o ambiente (.env)

- **Back-end**
  - Acesse o diretório `./back-end`
  - Altere o arquivo `.env.example` com as variáveis de ambiente indicadas:
  ```
  PORT=3001 // Porta onde a aplicação vai ouvir requisições
  DATABASE_URL="mysql://<USERNAME>:<PASSWORD>@localhost:<PORT>/desafio_native" // URL onde o banco MySQL está rodando
  JWT_SECRET=MySecretJWTSecret // Segredo usado para gerar tokens JWT (qualquer string)
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável
  - Renomeie o arquivo para `.env`
- **Front-end**
  - Acesse o diretório `./front-end`
  - Altere o arquivo `.env.example` com as variáveis de ambiente indicadas:
  ```
  REACT_APP_SERVER=http://localhost:<PORT> // URL de acesso à API (back-end)
  REACT_APP_WS_SERVER=ws://localhost:<PORT> // URL de acesso ao WebSocket (mesmo da API)
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável
  - Renomeie o arquivo para `.env`

### Instalar dependências
- Nas pastas `./back-end` e `./front-end` rode o comando `npm install`

## Inicializar a Aplicação
Inicialize o back-end e o front-end em terminais separados

> Por padrão o back-end inicializa na porta 3001
> Por padrão o front-end inicializa na porta 3000

- Back-end
  - Acesse o diretório `./back-end`
  - Rode o comando `npm run dev` para iniciar a API
- Front-end
  - Acesse o diretório `./front-end`
  - Rode o comando `npm start` para iniciar a aplicação React

## Acessar a Aplicação
- Back-end:
  - Você pode testar a aplicação via Postman ou Insomnia
- Front-end:
  - No seu navegador, use a URL (padrão): `http://localhost:3000`

</details>

# 🚧 Testes 🚧

Os testes foram desenvolvidos exclusivamente para a API (back-end)
> Os testes necessitam que as dependências do projeto estejam instaladas (`npm install`)

### Testes Unitários
- Rode o comando `npm run test:unit`

### Testes de Integração

Configure a variável de ambiente em `.env.test.example` e renomeie o arquivo para `.env.test`
```
DATABASE_URL="mysql://<USERNAME>:<PASSWORD>@localhost:<PORT>/desafio_native_test" // URL onde o banco MySQL de testes vai rodar
```
- **MySQL**: Rode o comando `npm run test:integration`
- **Docker**: Rode o comando `npm run test:integration:docker`

## Tecnologias Usadas

### Banco de Dados 💾
- [MySQL](https://www.mysql.com/)
- [Prisma ORM](https://www.prisma.io/)

### Back-end ⚙️
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Chai / chai-http](https://www.chaijs.com/)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- Bibliotecas JS: md5, cors, http-status-codes, faker

### Front-end 💻
- [React.js](https://pt-br.reactjs.org/) / [react-router-dom](https://reactrouter.com/en/main), [react-cookie](https://www.npmjs.com/package/react-cookie)
- [Material UI](https://mui.com/pt/)
- [Axios](https://axios-http.com/ptbr/)

### Geral 🧾
- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)
- [GitHub Actions](https://github.com/features/actions)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
</details>

# 💡 Referências a outros projetos 💡

Neste projeto foram utilizados recursos e sintaxe de código inspirados em outros projetos pessoais que já fiz:

- 🏅 [TrybeRank](https://github.com/RafaelAugustScherer/trybe-rank): Deploy Containerizado no Heroku; Front-end React
- 🚚 [DeliveryApp](https://github.com/RafaelAugustScherer/delivery-app): App Full-stack com MySQL, Express e JWT
- 🟨 [TodoListChallenge](https://github.com/RafaelAugustScherer/todoListChallenge): Desafio Técnico Fictício da Trybe
