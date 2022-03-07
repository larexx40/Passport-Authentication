const Users = require("./model/user");

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
            if(user){
                if(user.password === password){
                    next();
                } else{
                    errors.push('Username or Password incorrect');
                    res.render('login.ejs', {errors: errors})
                }
            }else{
                errors.push('username does not exist');
                res.render('login.ejs', {errors: errors})
            }
            
        }, (err)=>next(err))
        .catch((err) =>next(err));
    }
}

exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}