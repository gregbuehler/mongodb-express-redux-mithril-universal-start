var express = require('express'),
    blog = require('../../../client/js/pages/blog'),
    postsResource = require('./postsResource'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/blog'
router.get('/', function(req, res) {

    postsResource().then(function(posts) {

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

router.get('/api', function(req, res) {

    postsResource().then(function(posts) {
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

router.get('/:pagenum', function(req, res) {

    postsResource(req.params.pagenum).then(function(posts) {

        var state = {
            key: req.path,
            posts: posts,
            pagenum: req.params.pagenum
        };
        var ctrl = new blog.controller();
        ctrl.state = state;

        sendPage(res, blog.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

router.get('/:pagenum/api', function(req, res) {

    postsResource(req.params.pagenum).then(function(posts) {
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

