const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
    .route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers);

router
    .route('/:uuid')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;