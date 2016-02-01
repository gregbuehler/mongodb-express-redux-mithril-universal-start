var express = require('express'),
    blog = require('../../../client/js/pages/blog'),
    // blogResource = require('../../resources/blog/blogResource'),
    blogResource = require('./blogResource'),
    sendPage = require('../../utils/sendPage');

var pages = module.exports = express();

pages.get('/', function(req, res) {

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

pages.get('/api', function(req, res) {

    blogResource.then(function(posts) {
        if (posts) {
            res.json(posts);
        } else {
            return res.status(401).send({
                status: 401,
                errmsg: 'Post not found.'
            });
        }
    }, function(err) {
        return res.status(500).send(err);
    });
});

