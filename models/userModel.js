const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

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

UserSchema.plugin(uniqueValidator, {message: 'Is already taken.'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJWT = function(){
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)    
    }, secret);
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image
    };
};

const User = mongoose.model('User', UserSchema);

exports.User = User;