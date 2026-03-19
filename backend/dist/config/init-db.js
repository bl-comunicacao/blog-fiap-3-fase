"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SEED_USER_EMAIL = "drlohan@blog.local";
const SEED_USER_NAME = "DR.Lohan Dias";
const SEED_USER_PASSWORD = "123456";
const SALT_ROUNDS = 10;
/** Insere usuário e post iniciais se ainda não existirem (idempotente). */
async function seedInitialData() {
    const userCheck = await database_1.default.query("SELECT id FROM users WHERE email = $1", [SEED_USER_EMAIL]);
    if (userCheck.rows.length > 0) {
        console.log("Usuário inicial (DR.Lohan Dias) já existe. Seed ignorado.");
        return;
    }
    const password_hash = await bcrypt_1.default.hash(SEED_USER_PASSWORD, SALT_ROUNDS);
    const userInsert = await database_1.default.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id", [SEED_USER_NAME, SEED_USER_EMAIL, password_hash]);
    const userId = userInsert.rows[0]?.id;
    if (!userId)
        throw new Error("Falha ao criar usuário seed (id não retornado)");
    await database_1.default.query(`INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)`, [
        "Bem-vindo ao blog",
        "Este é o primeiro post. Olá, eu sou o DR.Lohan Dias.",
        userId,
    ]);
    console.log("Seed executado: usuário DR.Lohan Dias e um post cadastrados (login: " +
        SEED_USER_EMAIL +
        ", senha: " +
        SEED_USER_PASSWORD +
        ").");
}
const MAX_CONNECT_RETRIES = 10;
const RETRY_DELAY_MS = 2000;
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/** Aguarda o Postgres aceitar conexões (útil quando a API sobe logo após o healthcheck). */
async function waitForConnection() {
    for (let i = 0; i < MAX_CONNECT_RETRIES; i++) {
        try {
            await database_1.default.query("SELECT 1");
            return;
        }
        catch (err) {
            const code = err.code;
            if (code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEDOUT") {
                if (i < MAX_CONNECT_RETRIES - 1) {
                    console.log(`Aguardando Postgres (tentativa ${i + 1}/${MAX_CONNECT_RETRIES})...`);
                    await delay(RETRY_DELAY_MS);
                }
                else {
                    throw err;
                }
            }
            else {
                throw err;
            }
        }
    }
}
//verifica se o banco de dados está rodando e cria as tabelas se não existirem
async function initDatabase() {
    try {
        await waitForConnection();
        // Verifica se as tabelas users e posts existem
        const usersExistsResult = await database_1.default.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users'
      );
    `);
        const postsExistsResult = await database_1.default.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'posts'
      );
    `);
        const tablesExist = usersExistsResult.rows[0].exists && postsExistsResult.rows[0].exists;
        // Só executa o SQL se alguma tabela não existir
        if (!tablesExist) {
            // No container: código em dist/, tables.sql está em src/. Raiz = process.cwd() (/app).
            const fromCwd = path_1.default.join(process.cwd(), "src", "tables.sql");
            const fromDist = path_1.default.join(__dirname, "..", "tables.sql");
            const resolvedPath = fs_1.default.existsSync(fromCwd) ? fromCwd : fromDist;
            if (fs_1.default.existsSync(resolvedPath)) {
                const tablesSql = fs_1.default.readFileSync(resolvedPath, "utf8");
                await database_1.default.query(tablesSql);
                console.log("Tabelas criadas com sucesso.");
            }
            else {
                console.error("Arquivo tables.sql não encontrado em:", fromCwd, "ou", fromDist);
                throw new Error("tables.sql não encontrado. Verifique o caminho do arquivo.");
            }
        }
        else {
            console.log("Tabelas (users, posts) já existem. Nenhuma alteração foi feita no banco de dados.");
        }
        await seedInitialData();
    }
    catch (error) {
        const dbError = error;
        if (dbError.code === "ENOTFOUND" || dbError.code === "ECONNREFUSED") {
            console.error("Erro de conexão com o banco de dados. Verifique se o PostgreSQL está rodando.");
            console.error(`Tentando conectar em: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
            throw new Error("Não foi possível conectar ao banco de dados. Certifique-se de que o Docker está rodando: docker-compose up -d postgres");
        }
        throw error;
    }
}
exports.default = initDatabase;
//# sourceMappingURL=init-db.js.map