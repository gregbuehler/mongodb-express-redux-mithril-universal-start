var express = require('express'),
    postPage = require('../../../client/js/pages/blog/post'),
    postResource = require('./postResource'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/post'
router.get('/:id', function(req, res) {

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
