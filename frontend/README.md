# Frontend - Blog FIAP (Fase 3)

Interface web da plataforma de blogging desenvolvida em React, consumindo a API REST em Node.js/Express.

## Stack

- React + Vite
- React Router
- Axios
- Zustand (estado global de autenticação)
- Tailwind CSS

## Requisitos

- Node.js 18+
- npm 9+
- Backend rodando em `http://localhost:3000` (ou URL configurada via `.env`)

## Configuração

1. Instale dependências:

```bash
npm install
```

2. Crie arquivo `.env` na pasta `frontend` (opcional):

```env
VITE_API_URL=http://localhost:3000
```

## Execução

```bash
npm run dev
```

Aplicação disponível em `http://localhost:5173` (porta padrão do Vite).

## Build e qualidade

```bash
npm run lint
npm run build
```

## Arquitetura de pastas

```txt
src/
  components/
    Ui/               # componentes base (Button, Input, Modal, etc.)
  constants/          # constantes compartilhadas
  hooks/              # hooks customizados (infinite scroll, mount, post by id)
  pages/              # páginas da aplicação
  services/           # cliente HTTP (Axios)
  stores/             # Zustand store (auth)
  routes.jsx          # definição de rotas
```

## Páginas e funcionalidades

- **Home (`/`)**
  - Lista de posts
  - Busca por palavra-chave
  - Infinite scroll com paginação

- **Busca (`/search/:word_search`)**
  - Resultados filtrados
  - Infinite scroll e indicador de mais resultados

- **Leitura de post (`/post/:idPost`)**
  - Exibe conteúdo completo, data e autor

- **Login (`/login`)**
  - Autenticação de professores
  - Persistência de sessão com Zustand + localStorage

- **Dashboard (`/dashboard`)** *(rota protegida)*
  - Listagem administrativa
  - Editar/excluir posts

- **Criar post (`/create-post`)** *(rota protegida)*
  - Formulário de criação
  - Campo de autor em readonly (usuário autenticado)

- **Editar post (`/edit-post/:idPost`)** *(rota protegida)*
  - Formulário preenchido com dados atuais
  - Modal de confirmação antes de salvar

## Autenticação e rotas protegidas

- O token JWT é salvo em store global (`useAuthStore`) com persistência.
- O Axios injeta `Authorization: Bearer <token>` automaticamente.
- Rotas administrativas (`/dashboard`, `/create-post`, `/edit-post/:idPost`) usam `ProtectedRoute`.
- Sem autenticação, o usuário é redirecionado para `/login`.

## Integração com API

Principais endpoints consumidos:

- `POST /auth/login`
- `GET /posts`
- `GET /posts/:id`
- `GET /posts/search?q=...`
- `POST /posts` (autenticado)
- `PUT /posts/:id` (autenticado)
- `DELETE /posts/:id` (autenticado)

## Observações de UX implementadas

- Infinite scroll em Home, Dashboard e Busca.
- Loading com skeleton durante carregamento incremental.
- Indicador textual e visual quando há mais posts para carregar.
- Modais de confirmação para exclusão e edição de post.
