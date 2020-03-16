const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'cannot be empty'],
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/,'is Invalid'],
        index: true
    },
    email: {
        type: String,
        required: [true,'cannot be empty'],
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/,'is Invalid'],
        index: true
    },
    image: String,
    hash: String,
    salt: String
},{timestamps: true});



mongoose.model('User',UserSchema);