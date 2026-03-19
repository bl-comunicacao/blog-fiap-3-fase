"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByEmail = findByEmail;
exports.findById = findById;
exports.create = create;
const database_1 = __importDefault(require("../config/database"));
async function findByEmail(email) {
    const result = await database_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}
async function findById(id) {
    const result = await database_1.default.query("SELECT * FROM users WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
}
async function create(data) {
    const result = await database_1.default.query("INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *", [data.email, data.password_hash, data.name ?? null]);
    return result.rows[0];
}
//# sourceMappingURL=user.model.js.map