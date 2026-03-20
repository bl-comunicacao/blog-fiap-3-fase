import "dotenv/config";
import app from "./app";
import initDatabase from "./config/init-db";
import logger from "./utils/logger";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

(async (): Promise<void> => {
  try {
    await initDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      logger.info(`O server rodando na porta ${PORT}`);
    });
  } catch (error) {
    const err = error as Error;
    console.error("Erro ao iniciar a aplicação:", err.message);
    process.exit(1);
  }
})();
