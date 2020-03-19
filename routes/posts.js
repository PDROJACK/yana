const express = require('express');
const router = express.Router();
const postsController = require('../controller/postController');
const auth = require('../middleware/user-auth');

/* Get all the posts. */
router.get('/',auth.userAuth,postsController.getPosts);

/* Upload a post. */
router.post('/create',postsController.createPost);

/* Upvote a post. */
router.post('/:postId/upvote',postsController.upvote);

/* Delete a post. */
//router.delete('/',postsController.deletePosts);

module.exports = router;