var express = require('express'),
    render = require('mithril-node-render'),
    home = require('../client/js/pages/Home'),
    login = require('../client/js/pages/Login'),
    logout = require('../client/js/pages/Logout'),
    register = require('../client/js/pages/Register'),
    profile = require('../client/js/pages/Profile'),
    verify = require('../client/js/pages/Verify'),
    // blog = require('../client/js/pages/blog'),
    User = require('./models/User.js');

var router = module.exports = express();

//example of sync server-side rendering
router.get('/', function(req, res) {
    sendPage(res, home);
});

router.get('/login', function(req, res) {
    sendPage(res, login);
});

router.get('/logout', function(req, res) {
    sendPage(res, logout);
});

router.get('/register', function(req, res) {
    sendPage(res, register);
});

router.get('/verify/:code', function(req, res) {
    sendPage(res, verify);
});

//example of async server-side rendering
router.get('/profile', function(req, res) {
    User.findOne({
        }).exec()
        .then(function(user) {
            if (user) {
                
                user = user.toObject();
                delete user.password;

                if (!user.verified) {
                    return res.status(401).send({
                        status: 401,
                        errmsg: 'User not verified.'
                    });
                } else {
                    var ctrl = new profile.controller();
                    ctrl.user = user;
                    sendPage(res, profile.view(ctrl));
                }

            } else {
                return res.status(401).send({
                    status: 401,
                    errmsg: 'User not found.'
                });
            }
        }, function(err) {
            return res.status(500).send(err);
        });
});

function base(content) {
    var scrpt = (global.__client__ ? '<script src = "/app.js"></script>' : '');
    return [
        '<!DOCTYPE html>',
        '<html lang = "en">',
        '<head>',
        '<meta charset = "utf-8">',
        '<meta http - equiv = "X-UA-Compatible" content = "IE=edge"> ',
        '<meta name = "viewport" content = "width=device-width, initial-scale=1"> ',
        '<title> app </title>',
        '<link href = "/style/app.css" rel = "stylesheet" /> ',
        '</head>',
        '<body>',
        '<div id = "root">',
        content,
        '</div>',
        '<script src = "https://cdn.polyfill.io/v1/polyfill.min.js"></script>',
        scrpt,
        '</body>',
        '</html>'
    ].join('');
}

function sendPage(res, page) {
    res.type('html');
    res.end(base(render(page)));
}
