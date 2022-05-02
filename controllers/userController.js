const { User } = require('../models');
const { asyncMiddleware } = require('../middlewares');

exports.createUser = asyncMiddleware(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  return res.json(user);
})

exports.getAllUsers = asyncMiddleware(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
})

exports.getUser = asyncMiddleware(async (req, res) => {
  const { uuid } = req.params;
  const user = await User.findOne({ where: { uuid }, include: 'posts' });
  if (user) {
    return res.json(user);
  } else {
    return res.json({ message: 'User not found' });
  }
})

exports.updateUser = asyncMiddleware(async (req, res) => {
  const { body: {name, email}, params: {uuid} } = req;
  const user = await User.findOne({ where: { uuid } });
  user.name = name;
  user.email = email;
  await user.save();
  return res.json(user);
})

exports.deleteUser = asyncMiddleware(async (req, res) => {
  const { uuid } = req.params;
  await User.destroy({where: {uuid}});
  return res.json({ message: 'User deleted successfully' });
})