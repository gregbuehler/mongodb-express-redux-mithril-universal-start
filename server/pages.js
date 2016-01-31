var express = require('express'),
    render = require('mithril-node-render'),
    home = require('../client/js/pages/Home'),
    login = require('../client/js/pages/Login'),
    logout = require('../client/js/pages/Logout'),
    register = require('../client/js/pages/Register'),
    profile = require('../client/js/pages/Profile'),
    verify = require('../client/js/pages/Verify'),
    blog = require('../client/js/pages/blog'),
    blogResource = require('./pages/blog/blogResource'),
    postPage = require('../client/js/pages/blog/post'),
    postResource = require('./pages/blog/postResource'),
    usersResource = require('./pages/user/usersResource'),
    User = require('./models/User.js'),
    userPage = require('../client/js/pages/user'),
    auth = require('./auth.js');

var pages = module.exports = express();

//example of sync server-side rendering
pages.get('/', function(req, res) {
    sendPage(res, home);
});

pages.get('/login', function(req, res) {
    sendPage(res, login);
});

pages.get('/logout', function(req, res) {
    sendPage(res, logout);
});

pages.get('/register', function(req, res) {
    sendPage(res, register);
});

pages.get('/verify/:code', function(req, res) {
    sendPage(res, verify);
});

//example of async server-side rendering
pages.get('/user', [auth.requireToken, auth.authorized], function(req, res) {
    usersResource.then(function(users) {

        var state = {
            key: req.path,
            users: users
        };
        var ctrl = new userPage.controller();
        ctrl.state = state;

        sendPage(res, userPage.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

pages.get('/profile', auth.requireToken, function(req, res) {
    User.findOne({}).exec()
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

                    var state = {
                        key: req.path,
                        user: user
                    }
                    var ctrl = new profile.controller();
                    ctrl.state = state;
                    sendPage(res, profile.view(ctrl), state);
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

pages.get('/blog', function(req, res) {

    blogResource.then(function(posts) {

        var state = {
            key: req.path,
            posts: posts
        };
        var ctrl = new blog.controller();
        ctrl.state = state;

        sendPage(res, blog.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

pages.get('/post/:id', function(req, res) {

    postResource(req.params.id).then(function(post) {

        var state = {
            key: req.path,
            post: post
        };
        var ctrl = new postPage.controller();
        ctrl.state = state;

        sendPage(res, postPage.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    })
})

function base(content, state) {
    var stateToSend =
        state ?
        '<script>window.__state__ = window.__state__ || {}; window.__state__[\"' + state.key + '\"] = ' + JSON.stringify(state) + ';</script>' :
        null;

    var scriptToSend = (global.__client__ ? '<script src = "/app.js"></script>' : null);
    
    return [
        '<!DOCTYPE html>',
        '<html lang = "en">',
        '<head>',
        '<meta charset = "utf-8">',
        '<meta http - equiv = "X-UA-Compatible" content = "IE=edge"> ',
        '<meta name = "viewport" content = "width=device-width, initial-scale=1"> ',
        '<title> app title </title>',
        '<link href = "/style/app.css" rel = "stylesheet" /> ',
        stateToSend,
        '</head>',
        '<body>',
        '<div id = "root">',
        content,
        '</div>',
        '<script src = "https://cdn.polyfill.io/v1/polyfill.min.js"></script>',
        scriptToSend,
        '</body>',
        '</html>'
    ].join('');
}

function sendPage(res, page, state) {
    res.type('html');
    res.end(base(render(page), state));
}
