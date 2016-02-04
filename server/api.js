 var express = require('express'),
     apiLogin = require('./pages/login/apiLogin'),
     apiBlog = require('./pages/blog/apiBlog'),
     apiPost = require('./pages/blog/apiPost'),
     apiProfile = require('./pages/profile/apiProfile'),
     apiUsers = require('./pages/user/apiUsers'),
     apiRegister = require('./pages/register/apiRegister'),
     apiVerify = require('./pages/verify/apiVerify');

 var router = module.exports = express.Router();

 router.use('/login', apiLogin);

 router.use('/blog', apiBlog);

 router.use('/post', apiPost);

 router.use('/profile', apiProfile);

 router.use('/users', apiUsers);

 router.use('/register', apiRegister);

 router.use('/verify', apiVerify);
