import * as userModel from "../models/user.model";
import type { UserCreate, UserPublic } from "../types";
import { NotFoundError, UnauthorizedError, ValidationError } from "../errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

function toPublic(user: { id: number; email: string; name: string | null; created_at: Date }): UserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
  };
}

export async function register(data: UserCreate): Promise<{ user: UserPublic; token: string }> {
  const errors: string[] = [];
  if (!data.email?.trim()) errors.push("Email é obrigatório");
  if (!data.password || data.password.length < 6)
    errors.push("Senha deve ter no mínimo 6 caracteres");
  if (errors.length > 0) throw new ValidationError("Dados inválidos", errors);

  const existing = await userModel.findByEmail(data.email.trim());
  if (existing) throw new ValidationError("Email já cadastrado");

  const password_hash = await bcrypt.hash(data.password, SALT_ROUNDS);
  const user = await userModel.create({
    email: data.email.trim(),
    password_hash,
    name: data.name?.trim() || null,
  });

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não está definido");
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
  const token = jwt.sign(
    { userId: user.id },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );

  return { user: toPublic(user), token };
}

export async function login(
  email: string,
  password: string
): Promise<{ user: UserPublic; token: string }> {
  if (!email?.trim() || !password)
    throw new ValidationError("Email e senha são obrigatórios");

  const user = await userModel.findByEmail(email.trim());
  if (!user) throw new NotFoundError("Usuário não encontrado");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new UnauthorizedError("Senha inválida");

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não está definido");
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
  const token = jwt.sign(
    { userId: user.id },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );

  return { user: toPublic(user), token };
}
