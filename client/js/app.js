var m = require('mithril');

m.route.mode = 'pathname';

m.route(document.getElementById('root'), "/", {
  "/": require('./pages/Home.js'),
  "/login": require('./pages/Login.js'),
  "/logout": require('./pages/Logout.js'),
  "/register": require('./pages/Register.js'),
  "/verify/:code": require('./pages/Verify.js'),
  "/profile": require('./pages/Profile.js'),
  "/blog": require('./pages/blog'),
  "/post/:id": require('./pages/blog/post'),
  "/user": require('./pages/user')
});