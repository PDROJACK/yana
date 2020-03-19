const Posts = require('../models/postModel');

const getPosts = async function(req,res,next){
    try {
        const posts = await Posts.find().populate('userId','username');
        res.status(200).json({
            posts
        });
    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
}

const createPost = async function(req,res,next){
    try {
        const post = await new Posts({
            title: req.body.title,
            image: req.body.image,
            userId: req.body.userId
        });
        await post.save();
        res.status(200).json({
            message: 'Post successfully uploaded!!'
        });
    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
}


const upvote = async function(req,res,next){
    try{
        const post = await Posts.findById(req.params.postId);
        post.upvote();
        await post.save();
        return res.status(400).json({
            message: "Upvoted"
        })
    } catch(err) {
        res.status(401).json({
            error: err
        })
    }
}


module.exports = {
    getPosts,
    createPost,
    upvote
}