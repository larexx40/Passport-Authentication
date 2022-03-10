const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = require('../model/user')

exports.local = passport.use(new LocalStrategy(
    (username, password, done)=>{
        Users.findOne({ username: username }, (err, user)=>{
            if (err) { 
                return done(err); 
            }
            if (!user) { 
                return done(null, false, {message: "user does not exist"}); 
            }
            if (!(user.password === password)) {
                 return done(null, false, {message: "incorrect password"}); 
            }
            return done(null, user, {message: "Login Successful"});
        });
    }
));

//used to assign id to user in session
passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user._id)

})

//used the serialized userid to fetch user details in DB
passport.deserializeUser((_id, done) => {
    Users.findById(_id, (err, user)=>{
        done(err, user)
    })
   
})