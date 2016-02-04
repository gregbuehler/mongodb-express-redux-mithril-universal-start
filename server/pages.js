 var express = require('express'),
     homePage = require('./pages/home/home'),
     loginPage = require('./pages/login/login'),
     logoutPage = require('./pages/logout/logout'),
     registerPage = require('./pages/register/register'),
     verifyPage = require('./pages/verify'),
     blog = require('./pages/blog'),
     postPage = require('./pages/blog/post'),
     usersPage = require('./pages/user'),
     profilePage = require('./pages/profile/profile');

 var router = module.exports = express.Router();

 router.use('/', homePage);

 router.use('/login', loginPage);

 router.use('/logout', logoutPage);

 router.use('/register', registerPage);

 router.use('/verify', verifyPage);
 router.use('/verify/:code', verifyPage);

 router.use('/blog', blog);
 router.use('/post', postPage);

 router.use('/users', usersPage);

 router.use('/profile', profilePage);
