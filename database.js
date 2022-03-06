const mongoose = require('mongoose');
const config = require('./config');

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log('Connect to mongoDB successfully');
}, (err)=>{
    console.log("Connect to Mongo fail");
});