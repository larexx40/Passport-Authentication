const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const localStrategy = require('./auth/passport');
const FacebookStrategy= require('./auth/facebook')
const GoogleStrategy = require('./auth/google');
const config = require('./config')
const database = require('./database')
const flash = require('connect-flash');


var usersRouter = require('./routes/userRoute');
const auth = require('./authenticate');

var app = express();
app.use(flash());

//initialize express-session
const oneHour = 1000 * 60 * 60;
app.use(session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie:{
       maxAge: oneHour,
       secure: false 
    }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//serving public files
app.use(express.static(path.join(__dirname, 'public')));


//parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cokkie and body parser middleware
app.use(bodyParser.json());
app.use(cookieParser())

//initialise passport in every route call
app.use(passport.initialize());
//allow passport to use express session
app.use(passport.session());

app.use('/users', usersRouter);

app.get('/', (req,res)=>{
    res.render('header.ejs', {isLoggedIn: req.isAuthenticated()})
});

app.get('/login', (req, res, next)=>{
    res.render('login.ejs', {errors: []});
    
});

app.get('/auth/facebook', 
passport.authenticate('facebook', {scope: ['email']})
);

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'}), 
    (req, res)=>{
        res.redirect('/dashboard');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login' }),
    (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
});

//(passport-local)
app.post('/login',auth.verifyInput, passport.authenticate('local', { 
    failureRedirect: '/error', 
    failureFlash: true,
    }), 
    (req, res)=>{
        res.redirect('/dashboard')
});
app.get('/error', (req, res, next)=>{
    res.render('login.ejs', {errors: req.flash('error')})
})

app.get('/header', (req, res)=>{// islogged in because of header.ejs
    res.render('header.ejs', {isLoggedIn:true, name: req.user.username});

});

app.get('/dashboard', auth.isLoggedIn, (req, res)=>{
    res.render('dashboard.ejs', {user: req.user, isLoggedIn: req.isAuthenticated()});
})

app.get('/logout', (req, res)=>{
    req.logOut();
    res.send('logout successful, session terminated');
})

app.listen('3000', (req, res)=>{
    console.log("Server listening at https://localhost/3000");
});