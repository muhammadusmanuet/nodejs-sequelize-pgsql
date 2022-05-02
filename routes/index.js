const express = require('express');
const posts = require('./post');
const users = require('./user');
const { errorHandler } = require('../middlewares');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/posts', posts);
  app.use(errorHandler);
}