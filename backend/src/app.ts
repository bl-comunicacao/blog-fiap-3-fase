import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors from "cors";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/errorHandler.middleware";

const app: Express = express();
//Middleware para permitir requisições de qualquer origem
app.use(cors());

app.use(express.json());

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rotas públicas de autenticação
app.use("/auth", authRoutes);

//Rotas de posts (create, update, delete protegidos por auth)
app.use("/posts", postRoutes);

//Middleware de tratamento de erros
app.use(errorHandler);

export default app;
