const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = require('../model/user')

authUser = (username, password, done)=>{
    console.log(`Value of "User" in authUser function ----> ${username}`);
    console.log(`Value of "Password" in authUser function ----> ${password}`);

    Users.findOne({username: username}, (err, user)=>{
        if(err){
            return done(err, false)
        }
        else if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    })

}


passport.use(new LocalStrategy(authUser));

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