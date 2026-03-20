interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name?: string | null;
  created_at: Date;
  updated_at: Date;
}

interface PostCreate {
  title: string;
  content: string;
}

interface PostUpdate {
  title?: string;
  content?: string;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  email: string;
  password: string;
  name?: string;
}

export interface UserPublic {
  id: number;
  email: string;
  name: string | null;
  created_at: Date;
}

import { Request, Response } from "express";

// Request com userId injetado pelo middleware de auth
export interface AuthRequest extends Request {
  userId?: number;
}

// Extende a interface Request do Express para adicionar tipos explícitos aos body, params e query
interface TypedRequest<T = any> extends Request {
  body: T;
  params: any;
  query: any;
}

// Extende a interface Response do Express para adicionar um tipo explícito ao json
interface TypedResponse<T = any> extends Response {
  json: (body: T) => this;
}

export { Post, PostCreate, PostUpdate, TypedRequest, TypedResponse };
