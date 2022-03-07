const config=require('../config');
const Users = require('../model/user');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    //to select the profile objecti want
    profileFields: ['id', 'displayName', 'photos', 'emails']
}, (accessToken, refreshToken, profile, done)=>{
    //check the DB to find if user with profile.id exist
    Users.findOne({facebookId: profile.id}, (err, user)=>{
        if(err){
            throw err;
        }
        if(user){
            done(null, user);
        }else {
            user= new Users({
                facebookId: profile.id,
                username: profile.displayName,
                firstname: profile.name.givenName,
                lastname:profile.name.familyName,
                email: profile.emails[0].value,
            });
            user.save((err)=>{
                if(err){
                    console.log(err);
                }else {
                    console.log(user);
                    console.log("saving user");
                    done(null, user);
                }
            })
        }

    })
}
))

//used to assign id to user in session
passport.serializeUser( (user, done) => { 
    done(null, user)
})

//used the serialized userid to fetch user details in DB
passport.deserializeUser((obj, done) => {
    done(err, obj)
})