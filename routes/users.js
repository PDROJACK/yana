var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

/* GET users listing. */
router.get('/', userController.getUsers);


/* GET single user. */
router.get('/:userId', userController.getSingleUser);


/* POST create a user. */
router.post('/create', userController.createUser);


/* PATCH edit user details. */
router.patch('/:userId', userController.editUser);


/* DELETE a user. */
router.delete('/:userId', userController.deleteUser);


module.exports = router;
