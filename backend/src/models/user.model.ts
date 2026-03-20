import pool from "../config/database";
import type { User } from "../types";

export async function findByEmail(email: string): Promise<User | undefined> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

export async function findById(id: number): Promise<User | undefined> {
  const result = await pool.query<User>("SELECT * FROM users WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

interface UserInsert {
  email: string;
  password_hash: string;
  name?: string | null;
}

export async function create(data: UserInsert): Promise<User> {
  const result = await pool.query<User>(
    "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *",
    [data.email, data.password_hash, data.name ?? null]
  );
  return result.rows[0];
}
