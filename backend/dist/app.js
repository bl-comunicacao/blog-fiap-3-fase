"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const cors_1 = __importDefault(require("cors"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const app = (0, express_1.default)();
//Middleware para permitir requisições de qualquer origem
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
//Rotas públicas de autenticação
app.use("/auth", auth_routes_1.default);
//Rotas de posts (create, update, delete protegidos por auth)
app.use("/posts", post_routes_1.default);
//Middleware de tratamento de erros
app.use(errorHandler_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map