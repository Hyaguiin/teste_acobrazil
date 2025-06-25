# Teste para Trabalho - ACObrazil

<img src="logoaco.png" alt="Logo ACO Brasil" width="150"/>

Este repositório contém o projeto para o teste de trabalho da ACObrazil. O projeto é dividido em duas partes: **Client** e **Server**. A seguir, você encontrará as instruções para configurar e executar ambos os ambientes.

## Estrutura do Projeto

- **client**: Contém o frontend da aplicação.
- **server**: Contém o backend da aplicação.

## Requisitos

Antes de começar, verifique se você tem os seguintes requisitos instalados:

- [Node.js](https://nodejs.org) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [PostgreSQL](https://www.postgresql.org/) (para o backend)

---

## Configuração do Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente.

---

### 1. Configurando o Frontend (Client)

1. Navegue até o diretório `client`:

    ```bash
    cd client
    ```

2. Crie um arquivo `.env` com o seguinte conteúdo:

    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento do frontend:

    ```bash
    npm run dev
    ```

O frontend estará disponível em `http://localhost:5173`.

---

### 2. Configurando o Backend (Server)

1. Navegue até o diretório `server`:

    ```bash
    cd server
    ```

2. Crie um arquivo `.env` com o seguinte conteúdo:

    ```env
    DATABASE_URL=postgresql://seuusuarioo:suasenha@localhost:5432/motoristaacobrazil
    PORT=5000
    JWT_SECRET=!@motoristaacobrazil!@
    JWT_EXPIRES=1h
    CORS_ALLOWED=http://localhost:5173
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento do backend:

    ```bash
    npm run dev
    ```

O backend estará disponível em `http://localhost:5000`.

---

## Testes

### 1. Rodando os testes do frontend:

Se o projeto possuir testes para o frontend, você pode rodá-los com:

```bash
npm run test
