# 💻 Blog App - Frontend

Este é o módulo de **Front-end** do projeto de conclusão da fase de Full Stack Development da FIAP.
A aplicação consiste na interface de um blog com área administrativa para gerenciamento e leitura de postagens.

---

## 🛠 Tecnologias Utilizadas

* **React** — Construção da interface
* **Vite** — Bundler para desenvolvimento rápido
* **Tailwind CSS** — Estilização responsiva
* **Axios** — Requisições HTTP
* **React Router** — Gerenciamento de rotas

---

## 🚀 Funcionalidades

* 🔐 Autenticação via JWT
* 📊 Painel administrativo (Dashboard)
* 🔄 Consumo de API REST (Node.js)

---

## ⚙️ Como executar o projeto

### 📌 Pré-requisitos

Antes de iniciar o front-end, certifique-se de que:

* O **Back-end** está rodando
* O **Banco de Dados (Docker)** está ativo

---

### 📥 Instalação

Clone o repositório e acesse a pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

---

### 🔧 Variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `frontend`:

```env
VITE_API_URL=http://127.0.0.1:3000
```

> ⚠️ **macOS:** utilize `127.0.0.1` em vez de `localhost` para evitar problemas com IPv6.

---

### ▶️ Executando o projeto

```bash
npm run dev
```

---

### 🌐 Acesso

Abra no navegador:

```
http://localhost:5173/
```
