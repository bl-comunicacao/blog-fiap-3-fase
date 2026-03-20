import * as model from "../models/post.model";
import { NotFoundError, ValidationError } from "../errors";
import type { Post, PostCreate, PostUpdate } from "../types";

export const getAllPosts = async (
  page: number,
  limit: number
): Promise<{
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    totalPages: number;
  };
}> => {
  try {
    const { posts, total } = await model.findPostsPaginated(page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: page < totalPages,
        totalPages,
      },
    };
  } catch (error) {
    throw new Error(
      `Erro ao buscar posts: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
};

export const getPostById = async (id: string | number): Promise<Post> => {
  const idNumber = typeof id === "string" ? parseInt(id) : id;

  if (!idNumber || isNaN(idNumber)) throw new ValidationError("ID inválido");

  const post = await model.findByIdPost(idNumber);
  if (!post) throw new NotFoundError("Post não encontrado");

  return post;
};

export const createPost = async (data: PostCreate): Promise<Post> => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0)
    errors.push("Título é obrigatório");
  if (!data.content || data.content.trim().length === 0)
    errors.push("Conteúdo é obrigatório");
  const authorId = (data as unknown as { author_id?: number }).author_id;
  if (authorId == null || authorId <= 0) errors.push("Autor é obrigatório");

  if (errors.length > 0)
    throw new ValidationError(
      "Campos obrigatórios não preenchidos",
      errors
    );

  try {
    return await model.createPost(data);
  } catch (error) {
    throw new Error(
      `Erro ao criar post: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
};

export const updatePost = async (
  id: string | number,
  data: PostUpdate
): Promise<Post> => {
  const idNumber = typeof id === "string" ? parseInt(id) : id;

  if (!idNumber || isNaN(idNumber)) throw new ValidationError("ID inválido");

  const post = await model.findByIdPost(idNumber);
  if (!post) throw new NotFoundError("Post não encontrado");

  const updateData: PostUpdate & { id: number } = {
    id: idNumber,
    title: data.title !== undefined ? data.title : post.title,
    content: data.content !== undefined ? data.content : post.content,
  };

  try {
    return await model.updatePost(updateData);
  } catch (error) {
    throw new Error(
      `Error ao atualizar post: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
};

export const deletePost = async (id: string | number): Promise<void> => {
  const idNumber = typeof id === "string" ? parseInt(id) : id;

  if (!idNumber || isNaN(idNumber)) throw new ValidationError("ID inválido");

  const post = await getPostById(idNumber);
  if (!post) throw new NotFoundError("Post não encontrado");

  try {
    await model.removePost(idNumber);
  } catch (error) {
    throw new Error(
      `Erro ao deletar post: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
};

export const searchPosts = async (
  query: string,
  page: number,
  limit: number
): Promise<{
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    totalPages: number;
  };
}> => {
  if (!query || query.trim().length === 0)
    throw new ValidationError("Query de busca é obrigatória");

  try {
    const { posts, total } = await model.searchPostsPaginated(query, page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total,
        hasNextPage: page < totalPages,
        totalPages,
      },
    };
  } catch (error) {
    throw new Error(
      `Erro ao buscar posts: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
};
