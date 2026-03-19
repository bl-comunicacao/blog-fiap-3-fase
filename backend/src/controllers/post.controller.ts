import { Request, Response } from "express";
import * as service from "../services/post.service";
import { ValidationError } from "../errors";
import type { PostCreate, PostUpdate } from "../types";
import type { AuthRequest } from "../types";

export const getAll = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string }>,
  res: Response
): Promise<Response> => {
  const page = Number(req.query.page || 1);
  const requestedLimit = Number(req.query.limit || 20);

  if (!Number.isInteger(page) || page <= 0)
    throw new ValidationError("Parâmetro 'page' inválido");
  if (!Number.isInteger(requestedLimit) || requestedLimit <= 0)
    throw new ValidationError("Parâmetro 'limit' inválido");

  const limit = Math.min(requestedLimit, 20);
  const posts = await service.getAllPosts(page, limit);

  return res.status(200).json(posts);
};

export const getById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const post = await service.getPostById(req.params.id as string | number);
  return res.status(200).json(post);
};

export const create = async (
  req: AuthRequest & Request<{}, {}, PostCreate>,
  res: Response
): Promise<Response> => {
  const userId = req.userId;
  if (!userId) throw new ValidationError("Usuário não autenticado");
  const post = await service.createPost({ ...req.body, author_id: userId } as unknown as PostCreate);
  return res.status(201).json({
    message: "Post criado com sucesso",
    post,
  });
};

export const update = async (
  req: Request<{ id: string | number }, {}, PostUpdate>,
  res: Response
): Promise<Response> => {
  const post = await service.updatePost(req.params.id, req.body);
  return res.status(200).json({
    message: "Post atualizado com sucesso",
    post,
  });
};

export const remove = async (
  req: Request<{ id: string | number }>,
  res: Response
): Promise<Response> => {
  await service.deletePost(req.params.id);
  return res.status(204).send();
};

export const search = async (
  req: Request<{}, {}, {}, { q?: string; query?: string; page?: string; limit?: string }>,
  res: Response
): Promise<Response> => {
  const searchQuery = req.query.q || req.query.query;

  if (!searchQuery) throw new ValidationError("Query de busca é obrigatória");

  const page = Number(req.query.page || 1);
  const requestedLimit = Number(req.query.limit || 20);

  if (!Number.isInteger(page) || page <= 0)
    throw new ValidationError("Parâmetro 'page' inválido");
  if (!Number.isInteger(requestedLimit) || requestedLimit <= 0)
    throw new ValidationError("Parâmetro 'limit' inválido");

  const limit = Math.min(requestedLimit, 20);
  const posts = await service.searchPosts(searchQuery, page, limit);
  return res.status(200).json(posts);
};
