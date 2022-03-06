const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const localStrategy = require('./auth/passport');
const config = require('./config')
const database = require('./database')


var usersRouter = require('./routes/userRoute');

var app = express();

//initialize express-session
const oneHour = 1000 * 60 * 60;
app.use(session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie:{
       maxAge: oneHour 
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
    res.send("welcome to my authentication test, proceed to login");
});

app.get('/login', (req, res)=>{
    res.render('login.ejs');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'}), 
    (req, res)=>{
        res.redirect('/');
});

app.post('/login', passport.authenticate('local',{
    successRedirect: '/header',
    failureRedirect: '/login'
}));

app.get('/header', (req, res)=>{// islogged in because of header.ejs
    res.render('header.ejs', {isLoggedIn:true, name: req.user.username});

});

app.listen('3000', (req, res)=>{
    console.log("Server listening at https://localhost/3000");
});