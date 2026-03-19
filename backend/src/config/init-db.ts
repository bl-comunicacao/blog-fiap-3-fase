import pool from "./database";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

interface ErrorWithCode extends Error {
  code?: string;
}

const SEED_USER_EMAIL = "drlohan@blog.local";
const SEED_USER_NAME = "DR.Lohan Dias";
const SEED_USER_PASSWORD = "123456";
const SALT_ROUNDS = 10;

/** Insere usuário e post iniciais se ainda não existirem (idempotente). */
async function seedInitialData(): Promise<void> {
  const userCheck = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [SEED_USER_EMAIL]
  );
  if (userCheck.rows.length > 0) {
    console.log("Usuário inicial (DR.Lohan Dias) já existe. Seed ignorado.");
    return;
  }

  const password_hash = await bcrypt.hash(SEED_USER_PASSWORD, SALT_ROUNDS);
  const userInsert = await pool.query<{ id: number }>(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
    [SEED_USER_NAME, SEED_USER_EMAIL, password_hash]
  );
  const userId = userInsert.rows[0]?.id;
  if (!userId) throw new Error("Falha ao criar usuário seed (id não retornado)");

  await pool.query(
    `INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)`,
    [
      "Bem-vindo ao blog",
      "Este é o primeiro post. Olá, eu sou o DR.Lohan Dias.",
      userId,
    ]
  );

  console.log(
    "Seed executado: usuário DR.Lohan Dias e um post cadastrados (login: " +
      SEED_USER_EMAIL +
      ", senha: " +
      SEED_USER_PASSWORD +
      ")."
  );
}

const MAX_CONNECT_RETRIES = 10;
const RETRY_DELAY_MS = 2000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Aguarda o Postgres aceitar conexões (útil quando a API sobe logo após o healthcheck). */
async function waitForConnection(): Promise<void> {
  for (let i = 0; i < MAX_CONNECT_RETRIES; i++) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (err) {
      const code = (err as ErrorWithCode).code;
      if (code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEDOUT") {
        if (i < MAX_CONNECT_RETRIES - 1) {
          console.log(
            `Aguardando Postgres (tentativa ${i + 1}/${MAX_CONNECT_RETRIES})...`
          );
          await delay(RETRY_DELAY_MS);
        } else {
          throw err;
        }
      } else {
        throw err;
      }
    }
  }
}

//verifica se o banco de dados está rodando e cria as tabelas se não existirem
async function initDatabase(): Promise<void> {
  try {
    await waitForConnection();

    // Verifica se as tabelas users e posts existem
    const usersExistsResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users'
      );
    `);
    const postsExistsResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'posts'
      );
    `);
    const tablesExist = usersExistsResult.rows[0].exists && postsExistsResult.rows[0].exists;

    // Só executa o SQL se alguma tabela não existir
    if (!tablesExist) {
      // No container: código em dist/, tables.sql está em src/. Raiz = process.cwd() (/app).
      const fromCwd = path.join(process.cwd(), "src", "tables.sql");
      const fromDist = path.join(__dirname, "..", "tables.sql");
      const resolvedPath = fs.existsSync(fromCwd) ? fromCwd : fromDist;
      if (fs.existsSync(resolvedPath)) {
        const tablesSql = fs.readFileSync(resolvedPath, "utf8");
        await pool.query(tablesSql);
        console.log("Tabelas criadas com sucesso.");
      } else {
        console.error("Arquivo tables.sql não encontrado em:", fromCwd, "ou", fromDist);
        throw new Error("tables.sql não encontrado. Verifique o caminho do arquivo.");
      }
    } else {
      console.log("Tabelas (users, posts) já existem. Nenhuma alteração foi feita no banco de dados.");
    }

    await seedInitialData();
  } catch (error) {
    const dbError = error as ErrorWithCode;

    if (dbError.code === "ENOTFOUND" || dbError.code === "ECONNREFUSED") {
      console.error(
        "Erro de conexão com o banco de dados. Verifique se o PostgreSQL está rodando."
      );
      console.error(
        `Tentando conectar em: ${process.env.DB_HOST}:${process.env.DB_PORT}`
      );
      throw new Error(
        "Não foi possível conectar ao banco de dados. Certifique-se de que o Docker está rodando: docker-compose up -d postgres"
      );
    }
    throw error;
  }
}

export default initDatabase;
