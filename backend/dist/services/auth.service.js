"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const userModel = __importStar(require("../models/user.model"));
const errors_1 = require("../errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 10;
function toPublic(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
    };
}
async function register(data) {
    const errors = [];
    if (!data.email?.trim())
        errors.push("Email é obrigatório");
    if (!data.password || data.password.length < 6)
        errors.push("Senha deve ter no mínimo 6 caracteres");
    if (errors.length > 0)
        throw new errors_1.ValidationError("Dados inválidos", errors);
    const existing = await userModel.findByEmail(data.email.trim());
    if (existing)
        throw new errors_1.ValidationError("Email já cadastrado");
    const password_hash = await bcrypt_1.default.hash(data.password, SALT_ROUNDS);
    const user = await userModel.create({
        email: data.email.trim(),
        password_hash,
        name: data.name?.trim() || null,
    });
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET não está definido");
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: expiresIn });
    return { user: toPublic(user), token };
}
async function login(email, password) {
    if (!email?.trim() || !password)
        throw new errors_1.ValidationError("Email e senha são obrigatórios");
    const user = await userModel.findByEmail(email.trim());
    if (!user)
        throw new errors_1.NotFoundError("Usuário não encontrado");
    const valid = await bcrypt_1.default.compare(password, user.password_hash);
    if (!valid)
        throw new errors_1.UnauthorizedError("Senha inválida");
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET não está definido");
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: expiresIn });
    return { user: toPublic(user), token };
}
//# sourceMappingURL=auth.service.js.map