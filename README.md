💻 Blog App - Frontend

Este é o módulo de Front-end do projeto de conclusão da fase de Full Stack Development da FIAP. A aplicação consiste na interface de um Blog com área administrativa para gerenciamento e leitura de postagens.

🛠 Tecnologias Utilizadas

A interface foi construída com foco em performance e componentização, utilizando as seguintes tecnologias:

React: Biblioteca principal para construção da UI.
Vite: Bundler ultrarrápido para desenvolvimento.
Tailwind CSS: Framework de CSS utilitário para estilização rápida e responsiva.
Axios: Cliente HTTP para comunicação com a API REST.
React Router: Gerenciamento das rotas e navegação da aplicação (Páginas Públicas vs. Área Restrita).

🚀 Funcionalidades

Autenticação Segura: Tela de login com integração via JWT (JSON Web Token).
Painel Administrativo: Acesso restrito para usuários autenticados gerenciarem e visualizarem as postagens (Dashboard).
Consumo de API: Integração direta com o backend Node.js para listagem dinâmica do conteúdo.

⚙️ Como executar o projeto localmente

Pré-requisitos
Certifique-se de que o Back-end e o Banco de Dados (Docker) já estejam rodando em sua máquina antes de iniciar o front-end.
Clone o repositório e acesse a pasta do frontend:```bash
cd frontend
Instale as dependências do projeto:

Bash
npm install
Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz da pasta frontend e adicione a URL da API.

Atenção (Usuários de macOS): Para evitar conflitos de resolução IPv6 do Node.js, utilize o IP explícito 127.0.0.1 no lugar de localhost.

Snippet de código
VITE_API_URL=[http://127.0.0.1:3000](http://127.0.0.1:3000)
Inicie o servidor de desenvolvimento:

Bash
npm run dev
Acesse a aplicação no seu navegador padrão: http://localhost:5173/
