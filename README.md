# backend-projetoPWEB
 O ACPB Manager é um sistema web projetado para gerenciar as operações do novo aeroclube da Paraíba. Ele oferece funcionalidades para administração, controle de instrutores e alunos, organização de turmas e gerenciamento de aeronaves. O sistema é dividido entre as funções administrativas e operacionais, permitindo uma gestão eficiente do aeroclube.

## Como Rodar

Antes de começar, certifique-se de ter o [Docker](https://www.docker.com/) instalado em sua máquina.

### 1. Instale as dependências do projeto

```sh
npm install
```

### 2. Suba o container do banco de dados com Docker

```sh
docker compose up -d
```

### 3. Aplique as migrations do Prisma e gere o client

```sh
npx prisma migrate deploy
npx prisma generate
```

### 4. Inicie o servidor

```sh
npm run dev
```

O projeto estará rodando em `http://localhost:8008` (ou na porta configurada no seu ambiente).
