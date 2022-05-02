const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router
    .route('/')
    .post(postController.createPost)
    .get(postController.getAllPosts);

router
    .route('/:uuid')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;