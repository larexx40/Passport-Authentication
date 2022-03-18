const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../model/user');
const config = require('../config');

passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    scope: [ 'id', 'displayName', 'profile' ],
    state: true,    
  },
    (accessToken, refreshToken, profile, done)=>{
    console.log({status: "profiled returned from googleAUth", profile: profile});
    Users.findOne({ googleId: profile.id }, (err, user)=>{
        if(err){
            throw err;
        }
        if(user){
            console.log({status: "User Exist",user: user});
           return done(null, user);
        }else {
            user= new Users({
                googleId: profile.id,
                username: profile.displayName,
                firstname: profile.name.givenName,
                lastname:profile.name.familyName,
                //email: profile.emails[0].value
                picture: profile.photos ? profile.photos[0].value :'no image'
            });
            user.save((err)=>{
                if(err){
                    console.log(err);
                }else {
                    console.log({status: "saving user", user: user});
                    return done(null, user);
                    
                }
            })
        }
    });
  }
));

//used to assign id to user in session
passport.serializeUser( (user, done) => { 
    done(null, user)
})

//used the serialized userid to fetch user details in DB
passport.deserializeUser((obj, done) => {
    done(err, obj)
})