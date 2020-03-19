const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

var PostModel = new Schema({
    title: {
        type: String,
        required: [true,'cannot be empty'],
        lowercase: true,
        unique: true,
        index: true,
        minlength:8,
        max: 50
    },
    image: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upvotes : { type: Number , default: 0}
},{timestamps: true});

PostModel.methods.upvote = function(){
    this.upvotes++ ;
}

PostModel.methods.downvote = function(){
    this.upvotes--;
}

module.exports = mongoose.model('Posts',PostModel);