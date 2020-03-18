var express = require('express');
var router = express.Router();
var postsController = require('../controller/postController');

/* Get all the posts. */
router.get('/',postsController.getPosts);

/* Upload a post. */
router.post('/',postsController.uploadPost);

/* Delete a post. */
router.delete('/',postsController.deletePosts);

module.exports = router;