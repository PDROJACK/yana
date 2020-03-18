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
    image: String,
    userId:{
        required: true,
        ref: userId
    }
},{timestamps: true});

module.exports = mongoose.model('Posts',PostModel);