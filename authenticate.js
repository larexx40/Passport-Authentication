const Users = require("./model/user");

exports.verifyInput= (req, res, next)=>{
    const username =req.body.username;
    const password = req.body.password;
    const errors=[];

    if(username === ''){
        errors.push('username cannot be empty');
    }
    if(password === ''){
        errors.push('password cannot be empty');
    }

    if(errors.length > 0){
        res.render('login.ejs', {errors: errors});
    }else{
        next();
    }
}

exports.verifyLogin = (req, res, next)=>{
    const username =req.body.username;
    const password = req.body.password;
    const errors=[];

    if(username === ''){
        errors.push('username cannot be empty');
    }
    if(password === ''){
        errors.push('password cannot be empty');
    }

    if(errors.length > 0){
        res.render('login.ejs', {errors: errors});
    }else {
        Users.findOne({username: username})
        .then((user) => {
            if(!user){
                errors.push('Username does not exist');
                res.render('login.ejs', {errors: errors})

            }
            if(user){
                if(user.password === password){
                    next(user);
                } else{
                    errors.push('Username or Password incorrect');
                    res.render('login.ejs', {errors: errors})
                }
            }else{
                errors.push('username does not exist');
                res.render('login.ejs', {errors: errors})
            }
            
        }, (err)=>next(err))
        .catch((err) => {
            done(err, null, { message: 'Error connecting to database' });
        });
    }
}

exports.isLoggedIn = (req, res, next)=>{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}
