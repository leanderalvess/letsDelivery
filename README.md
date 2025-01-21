# LetsDelivery

## Descrição

Este projeto é uma API REST para gerenciamento de clientes, desenvolvido utilizando **Node.js**, **TypeScript**, **AWS Lambda** e **DynamoDB** em uma arquitetura **serverless**. Ele inclui funcionalide CRUD completa, middleware de validação, e testes unitários com cobertura.

---

## Funcionalidades

- Cadastro de clientes
- Atualização de clientes
- Exclusão de clientes
- Listagem de clientes
- Middleware de validação de requisições
- Testes unitários com Jest
- Cobertura de testes integrada

---

## Estrutura do Projeto

```plaintext
letsDelivery/
├── .aws-sam/                # Diretório gerado pelo SAM CLI
├── coverage/                # Relatórios de cobertura de testes
├── dist/                    # Código transpilado (JavaScript)
├── node_modules/            # Dependências do projeto
├── src/                     # Código-fonte
│   ├── dtos/                # Data Transfer Objects
│   │   └── customerDto.ts
│   ├── middleware/          # Middlewares
│   │   └── validateRequest.ts
│   ├── routes/              # Rotas da aplicação
│   │   └── customerRoutes.ts
│   ├── services/            # Lógica de negócios
│   │   └── customerService.ts
│   └── index.ts             # Handler principal
├── tests/                   # Testes unitários
│   ├── middleware/          # Testes dos middlewares
│   │   └── validateRequest.test.ts
│   ├── mock/                # Mock de dados
│   │   └── customer.ts
│   ├── routes/              # Testes das rotas
│   │   └── customerRoutes.test.ts
│   ├── customerService.test.ts # Testes da service
│   └── index.test.ts        # Testes do handler principal
├── .env                     # Variáveis de ambiente para execução local
├── .env.test                # Variáveis de ambiente para testes
├── dynamodb-local.sh        # Script para o DynamoDB local
├── jest.config.js           # Configuração do Jest
├── jest.setup.js            # Configuração de inicialização do Jest
├── package.json             # Configuração de dependências e scripts
├── README.md                # Documentação do projeto
├── samconfig.toml           # Configuração do SAM CLI
├── template.yaml            # Template do SAM
└── tsconfig.json            # Configuração do TypeScript
```

---

## Pré-requisitos

- Node.js >= 20.x
- AWS SAM CLI >= 1.85.0
- DynamoDB Local
- Docker

---

## Configuração do Ambiente

1. Clone este repositório:
```bash
git clone https://github.com/leanderalvess/letsDelivery.git
cd letsDelivery
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente nos arquivos `.env*`:
.env:
```plaintext
TABLE_NAME='Customers'
AWS_REGION='us-east-1'
```
.env.test:
```plaintext
TABLE_NAME=Customers
AWS_REGION=us-east-1
```

4. Inicie o DynamoDB local:
```bash
./dynamodb-local.sh run
```
veja mais em: ./dynamodb-local.sh
---

## Scripts Disponíveis

### Executar a aplicação localmente:
```bash
sam local start-api
```

### Compilar o projeto:
```bash
npm run build
```

### Rodar os testes:
```bash
npm run test
```

### Verificar a cobertura dos testes:
```bash
npm run test:coverage
```

### Deploy para a AWS:
```bash
sam deploy
```
---