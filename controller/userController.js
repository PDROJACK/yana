var {User} = require('../models/userModel');
var _ = require('lodash');

/* Get a list of users  */
const getUsers = async function(req, res, next) {
    try {
        const user = await User.find().select('username email');
        return res.status(200).json({
            user
        })
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

/* Get a single user */
const getSingleUser = async function(req, res, next) {
    try {
        const id = req.params.userId;
        const user = await User.findById(id).select('username email');
        return res.status(200).json({
            user
        })
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

/* Create a new user and store in the database */
const createUser = async function(req, res, next) {
    try{
        let user = new User(_.pick(req.body, ['username', 'email']));
        user.setPassword(req.body.password);
        await user.save();
        return res.status(200).send('All ok!');
    } catch(error) {
        res.status(201).json({message:error.message});
    };
}

/* Delete a user from the database */
const deleteUser = function(req,res,next){
    res.status(400).json({
      message: 'user deleted!!',
      id: req.params.userId
    })
}

/* Edit the details of user */
const editUser = async function(req,res,next){
    try {
        const id = req.params.userId;
        const user = await User.findById(id);
        if(!user){
            return res.status(500).json({
                error: 'No user found'
            });
        }
        res.status(200).json({
            message: 'User found'
        });
    } catch(err) {
        res.status(404).json({error:err});
    }
}

/* Authorize a user */
const auth = async function(req,res,next){
    try {
        let user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({
                message: 'User does not exist',
                fix: {
                    request: 'POST',
                    url: 'http://localhost:3000/users/create'
                }
            })
        }
        const passCheck = await user.validPassword(req.body.password);
        if(!passCheck){
            return res.status(400).json({
                message: 'Invalid email or password',
                fix : {
                    message: 'Forgot Password !'
                }
            })
        }
        const token = await user.toAuthJSON();
        res.status(200).json(token);
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
}

module.exports = {
    editUser,
    auth,
    deleteUser,
    createUser,
    getSingleUser,
    getUsers
}