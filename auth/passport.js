const passport = require('passport');
const LocalStrategy = require('passport-local');


authUser = (username, password, done)=>{
    console.log(`Value of "User" in authUser function ----> ${username}`);
    console.log(`Value of "Password" in authUser function ----> ${password}`);

    let authenticated_user = { id: 123, name: "Kyle"}
    if( username == 'admin' && password == "admin123"){
        return done(null, authenticated_user )
    }

}


passport.use(new LocalStrategy(authUser));

passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user.id)

})
passport.deserializeUser((id, done) => {
    console.log("---------> Deserialize Id")
    console.log(id)

    done (null, {name: "Kyle", id: 123} )        

}) 