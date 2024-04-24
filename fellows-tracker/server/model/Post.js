const knex = require('./knex');

class Post {

  static async create(post_content, fellow_id) {
    const query = `
      INSERT INTO posts (post_content, fellow_id)
      VALUES (?, ?)
      RETURNING *;
    `;
    const { rows } = await knex.raw(query, [post_content, fellow_id]);
    return rows[0];
  }

  static async list() { // Get all
    const query = `
      SELECT * 
      FROM posts;
    `;
    const { rows } = await knex.raw(query);
    return rows;
  }

  static async findById(id) { // Get one
    const query = `
      SELECT * 
      FROM posts
      WHERE id=?
    `;
    const { rows } = await knex.raw(query, [id]);
    return rows[0];
  }

  static async findPostsByFellowId(fellow_id) { // Get one
    const query = `
      SELECT posts.id, posts.post_content 
      FROM posts
      JOIN fellows
        ON posts.fellow_id = fellows.id
      WHERE fellows.id=?
    `;
    const { rows } = await knex.raw(query, [fellow_id]);
    return rows;
  }

  static async delete(id) { // Delete
    const query = `
      DELETE FROM posts
      WHERE id=?
      RETURNING *
    `
    let { rows } = await knex.raw(query, [id]);
    return rows;
  }

  static async deleteAllPostsForFellow(fellow_id) {
    const query = `
      DELETE FROM posts
      WHERE fellow_id = ?
    `
    await knex.raw(query, [fellow_id]);
  }
}

module.exports = Post;