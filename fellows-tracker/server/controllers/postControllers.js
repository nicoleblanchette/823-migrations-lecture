const Post = require('../model/Post');

// POST /api/posts
// body: { postContent: string, fellowId: number}
const createPost = async (req, res) => {
  const { postContent, fellowId } = req.body; // The POST request body will be an object: `{ fellowName: 'name' }`
  const newPost = await Post.create(postContent, fellowId);
  res.send(newPost);
};

// GET /api/posts
const servePosts = async (req, res) => {
  const posts = await Post.list();
  res.send(posts);
}

// GET /api/posts/:id
const servePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(Number(id));

  if (!post) return res.status(404).send(`No post with the id ${id}`);
  res.send(post);
};

// GET /api/fellows/:fellowId/posts
const servePostsByFellow = async (req, res) => {
  const { fellowId } = req.params;
  const posts = await Post.findPostsByFellowId(Number(fellowId));

  if (!posts) return res.status(404).send(`No posts by fellow with the id ${id}`);
  res.send(posts);
};

// Delete
// DELETE /api/posts/:id
const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.delete(Number(id));
  if (!deletedPost) res.sendStatus(404);
  res.send(deletedPost);
}

module.exports = {
  servePosts,
  servePost,
  createPost,
  deletePost,
  servePostsByFellow
};