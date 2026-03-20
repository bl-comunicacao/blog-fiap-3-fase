"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const AppError_1 = require("./AppError");
/**
 * Erro para acesso não autorizado (401)
 */
class UnauthorizedError extends AppError_1.AppError {
    constructor(message = "Não autorizado") {
        super(message, 401);
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map