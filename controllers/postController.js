const { Post, User } = require('../models');
const { asyncMiddleware } = require('../middlewares');

exports.createPost = asyncMiddleware(async (req, res) => {
  const { body, userUuid } = req.body;
  const user = await User.findOne({ where: { uuid: userUuid } });
  if(!user) {
    return res.status(404).json({ message: 'User with given id was not found' });
  }
  const post = await Post.create({ body, userId: user.id });
  return res.json(post);
})

exports.getAllPosts = asyncMiddleware(async (req, res) => {
  const posts = await Post.findAll({include: 'user' });
  //                             or include: ['user'], or include: [{model: User, as: 'user'}]
  return res.json(posts);
})

exports.getPost = asyncMiddleware(async (req, res) => {
  const { uuid } = req.params;
  const post = await Post.findOne({ where: { uuid } });
  if (post) {
    return res.json(post);
  } else {
    return res.json({ message: 'Post not found' });
  }
})

exports.updatePost = asyncMiddleware(async (req, res) => {
  const { body: { body, userUuid }, params: {uuid} } = req;
  const user = await User.findOne({ where: { uuid: userUuid } });
  if(!user) {
    return res.status(404).json({ message: 'User with given id was not found' });
  }
  const post = await Post.findOne({ where: { uuid } });
  post.body = body;
  post.userId = user.id;
  await post.save();
  return res.json(post);
})

exports.deletePost = asyncMiddleware(async (req, res) => {
  const { uuid } = req.params;
  await Post.destroy({where: {uuid}});
  return res.json({ message: 'Post deleted successfully' });
})