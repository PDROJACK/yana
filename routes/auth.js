var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.post('/',userController.auth);


module.exports = router;