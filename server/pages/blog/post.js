var express = require('express'),
    postPage = require('../../../client/js/pages/blog/post'),
    // postResource = require('../../resources/blog/postResource'),
    postResource = require('./postResource'),
    sendPage = require('../../utils/sendPage');

var postApp = module.exports = express();

postApp.get('/:id', function(req, res) {

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

postApp.get('/:id/api', function(req, res) {

    postResource(req.params.id).then(function(post) {
        if (post) {
            res.json(post);
        } else {
            return res.status(401).send({
                status: 401,
                errmsg: 'Post not found.'
            });
        }
    }, function(err) {
        return res.status(500).send(err);
    });
})
