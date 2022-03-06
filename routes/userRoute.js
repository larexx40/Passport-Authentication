const express = require('express')
const Users = require('../model/user');

var userRouter= express.Router();

//get all users in db
userRouter.get('/', (req, res, next)=>{
    Users.find({})
    .then((users) => {
        res.status(200).json(users)
    }, (err)=>{next(err)})
    .catch((err) => {next(err)});
});

module.exports = userRouter;