const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const Users = require('./model/user')

exports.facebookPassport = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
    },
    (accessToken, refreshToken, profile, done)=>{
        process.nextTick(()=>{
            return done(null, profile)
        })
    }
));