import pool from "../config/database";
import { Post, type PostCreate, type PostUpdate } from "../types";

export const findAllPosts = async (): Promise<Post[]> => {
  const result = await pool.query<Post>(
    `SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     ORDER BY p.created_at DESC`
  );
  return result.rows;
};

export const findPostsPaginated = async (
  page: number,
  limit: number
): Promise<{ posts: Post[]; total: number }> => {
  const offset = (page - 1) * limit;

  const [postsResult, countResult] = await Promise.all([
    pool.query<Post>(
      `SELECT p.*, u.name as author_name
       FROM posts p
       INNER JOIN users u ON p.author_id = u.id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    ),
    pool.query<{ count: string }>(`SELECT COUNT(*) FROM posts`),
  ]);

  return {
    posts: postsResult.rows,
    total: parseInt(countResult.rows[0]?.count || "0", 10),
  };
};

export const findByIdPost = async (id: number): Promise<Post | undefined> => {
  const result = await pool.query<Post>(`SELECT * FROM posts WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
};

export const createPost = async (data: PostCreate): Promise<Post> => {
  const insert = await pool.query<{ id: number }>(
    `INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING id`,
    [data.title, data.content, (data as unknown as { author_id: number }).author_id]
  );
  const id = insert.rows[0]?.id;
  const result = await pool.query<Post>(
    `SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const updatePost = async (
  data: PostUpdate & { id: number }
): Promise<Post> => {
  const result = await pool.query<Post>(
    `UPDATE posts
     SET title = $1, content = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING id`,
    [data.title, data.content, data.id]
  );
  const id = (result.rows[0] as unknown as { id: number })?.id ?? data.id;
  const full = await pool.query<Post>(
    `SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     WHERE p.id = $1`,
    [id]
  );
  return full.rows[0];
};

export const removePost = async (id: number): Promise<Post> => {
  const result = await pool.query<Post>(
    `DELETE FROM posts WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  const result = await pool.query<Post>(
    `SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     WHERE p.title ILIKE $1 OR p.content ILIKE $1 OR u.name ILIKE $1`,
    [`%${query}%`]
  );
  return result.rows;
};

export const searchPostsPaginated = async (
  query: string,
  page: number,
  limit: number
): Promise<{ posts: Post[]; total: number }> => {
  const offset = (page - 1) * limit;

  const [postsResult, countResult] = await Promise.all([
    pool.query<Post>(
      `SELECT p.*, u.name as author_name
       FROM posts p
       INNER JOIN users u ON p.author_id = u.id
       WHERE p.title ILIKE $1 OR p.content ILIKE $1 OR u.name ILIKE $1
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [`%${query}%`, limit, offset]
    ),
    pool.query<{ count: string }>(
      `SELECT COUNT(*) 
       FROM posts p
       INNER JOIN users u ON p.author_id = u.id
       WHERE p.title ILIKE $1 OR p.content ILIKE $1 OR u.name ILIKE $1`,
      [`%${query}%`]
    ),
  ]);

  return {
    posts: postsResult.rows,
    total: parseInt(countResult.rows[0]?.count || "0", 10),
  };
};
