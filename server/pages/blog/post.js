var express = require('express'),
    postPage = require('../../../client/js/pages/blog/post'),
    // postResource = require('../../resources/blog/postResource'),
    postResource = require('./postResource'),
    sendPage = require('../../utils/sendPage'),
    Post = require('./postModel'),
    auth = require('../../utils/auth');

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

router.get('/:id/api', function(req, res) {

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

router.post('/', [auth.requireToken, auth.authorized], function(req, res) {
    if (req.body.action) {

        var action = req.body.action;
        var types = postReducer.types;

        switch (action.type) {

            case types.CREATE:

                
                action.post.author = req.user._id;

                Post.create(action.post, function(err, result) {
                    if (err) res.status(500).send(err);
                    res.status(200).send(result);
                })
                break;
            case types.UPDATE:
                Post.update({
                    id: action.post.id
                }, action.post, function(err, result) {
                    if (err) res.status(500).send(err);
                    res.status(200).send(result);
                })
                break;

            case types.REMOVE:
                Post.remove({
                    id: action.id
                }, function(err) {
                    if (err) res.status(500).send(err);
                    res.status(200).send({
                        msg: 'Post deleted.'
                    });
                })
                break;
            default:
                res.status(500).send({
                    errmsg: 'Action is invalid.'
                })
        }
    } else {

        res.status(500).send({
            errmsg: 'Action not found.'
        })
    }
})
