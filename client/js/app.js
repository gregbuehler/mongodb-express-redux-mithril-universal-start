var m = require('mithril');

m.route.mode = 'pathname';

m.route(document.getElementById('root'), "/", {
  "/": require('./pages/home/Home.js'),
  "/login": require('./pages/login/Login.js'),
  "/logout": require('./pages/logout/Logout.js'),
  "/register": require('./pages/register/Register.js'),
  "/verify/:code": require('./pages/verify/Verify.js'),
  "/profile": require('./pages/profile/Profile.js'),
  "/blog": require('./pages/blog'),
  "/blog/:page": require('./pages/blog'),
  "/post/:id": require('./pages/blog/post'),
  "/users": require('./pages/user'),
  "/users/:page": require('./pages/user')
});