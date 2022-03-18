const mongoose= require('mongoose');
const UserSchema = mongoose.Schema({
    username: { type: String, require: true },
    password:{type: String,require: true},
     firstname:{
        type: String,
        default: '' 
    },
    lastname:{
        type: String,
        default: ''
    },
    email:{
        type: String, 
        unique: false,
    },
    token:{
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    facebookId:{type: String},
    googleId:{type: String},
    picture:{type: String}
    
});

var Users = mongoose.model('user', UserSchema);
module.exports = Users;