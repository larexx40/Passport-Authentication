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
        unique: true
    },
    token:{
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
    
});

var Users = mongoose.model('user', UserSchema);
module.exports = Users;