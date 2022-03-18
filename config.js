module.exports = {
    'secretKey': '12344-78900-44321-00987',
    'mongoUrl': 'mongodb://localhost:27017/myAuth',
    'facebook':{
        clientId: '496534885393192',
        clientSecret: 'c47688f15da278eed04e043b6c2a6954',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    'google':{
        clientId: '604804755077-0q0m6u1voth1cn4e0gih81gtc2o9fkhb.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }
}