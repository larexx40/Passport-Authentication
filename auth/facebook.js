const config=require('../config');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
}, (accessToken, refreshToken, profile, done)=>{
    return done(null, profile); 
}
))

//used to assign id to user in session
passport.serializeUser( (user, done) => { 
    done(null, user)

})

//used the serialized userid to fetch user details in DB
passport.deserializeUser((user, done) => {
        done(err, user)
   
})