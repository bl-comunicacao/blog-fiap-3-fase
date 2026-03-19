"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errors_1.UnauthorizedError("Token não informado");
    }
    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não configurado");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.userId = payload.userId;
        next();
    }
    catch {
        throw new errors_1.UnauthorizedError("Token inválido ou expirado");
    }
}
//# sourceMappingURL=auth.middleware.js.map