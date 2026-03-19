"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPostsPaginated = exports.searchPosts = exports.removePost = exports.updatePost = exports.createPost = exports.findByIdPost = exports.findPostsPaginated = exports.findAllPosts = void 0;
const database_1 = __importDefault(require("../config/database"));
const findAllPosts = async () => {
    const result = await database_1.default.query(`SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     ORDER BY p.created_at DESC`);
    return result.rows;
};
exports.findAllPosts = findAllPosts;
const findPostsPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [postsResult, countResult] = await Promise.all([
        database_1.default.query(`SELECT p.*, u.name as author_name
       FROM posts p
       INNER JOIN users u ON p.author_id = u.id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`, [limit, offset]),
        database_1.default.query(`SELECT COUNT(*) FROM posts`),
    ]);
    return {
        posts: postsResult.rows,
        total: parseInt(countResult.rows[0]?.count || "0", 10),
    };
};
exports.findPostsPaginated = findPostsPaginated;
const findByIdPost = async (id) => {
    const result = await database_1.default.query(`SELECT * FROM posts WHERE id = $1`, [
        id,
    ]);
    return result.rows[0];
};
exports.findByIdPost = findByIdPost;
const createPost = async (data) => {
    const insert = await database_1.default.query(`INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING id`, [data.title, data.content, data.author_id]);
    const id = insert.rows[0]?.id;
    const result = await database_1.default.query(`SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     WHERE p.id = $1`, [id]);
    return result.rows[0];
};
exports.createPost = createPost;
const updatePost = async (data) => {
    const result = await database_1.default.query(`UPDATE posts
     SET title = $1, content = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING id`, [data.title, data.content, data.id]);
    const id = result.rows[0]?.id ?? data.id;
    const full = await database_1.default.query(`SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     WHERE p.id = $1`, [id]);
    return full.rows[0];
};
exports.updatePost = updatePost;
const removePost = async (id) => {
    const result = await database_1.default.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
exports.removePost = removePost;
const searchPosts = async (query) => {
    const result = await database_1.default.query(`SELECT p.*, u.name as author_name
     FROM posts p
     INNER JOIN users u ON p.author_id = u.id
     WHERE p.title ILIKE $1 OR p.content ILIKE $1 OR u.name ILIKE $1`, [`%${query}%`]);
    return result.rows;
};
exports.searchPosts = searchPosts;
const searchPostsPaginated = async (query, page, limit) => {
    const offset = (page - 1) * limit;
    const [postsResult, countResult] = await Promise.all([
        database_1.default.query(`SELECT p.*, u.name as author_name
       FROM posts p
       INNER JOIN users u ON p.author_id = u.id
       WHERE p.title ILIKE $1 OR p.content ILIKE $1 OR u.name ILIKE $1
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`, [`%${query}%`, limit, offset]),
        database_1.default.query(`SELECT COUNT(*) 
       FROM posts p
       INNER JOIN users u ON p.author_id = u.id
       WHERE p.title ILIKE $1 OR p.content ILIKE $1 OR u.name ILIKE $1`, [`%${query}%`]),
    ]);
    return {
        posts: postsResult.rows,
        total: parseInt(countResult.rows[0]?.count || "0", 10),
    };
};
exports.searchPostsPaginated = searchPostsPaginated;
//# sourceMappingURL=post.model.js.map