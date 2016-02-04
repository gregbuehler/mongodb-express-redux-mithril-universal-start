var express = require('express'),
    postResource = require('./postResource'),
    postReducer = require('../../../client/js/pages/blog/postReducer'),
    Post = require('./postModel'),
    auth = require('../../utils/auth'),
    bodyParser = require('body-parser'),
    urlParse = bodyParser.urlencoded({
        extended: true
    }),
    jsonParse = bodyParser.json();

var router = module.exports = express.Router();

router.get('/:id', function(req, res) {

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

router.post('/', [auth.requireToken, auth.authorized, urlParse, jsonParse], function(req, res) {

    if (req.body.action) {

        var action = req.body.action;
        var types = postReducer.types;

        switch (action.type) {

            case types.CREATE:

                action.post.author = req.user._id;
                action.post.id = action.post.title.replace(/\s/g, '_');

                Post.create(action.post, function(err, result) {
                    if (err) res.status(500).send(err);
                    res.status(200).send(result);
                })
                break;

            case types.UPDATE:

                //TODO: action.post.id should be action.post.title
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


router.post('/duplicate', [urlParse, jsonParse], function(req, res) {

    if (req.body.action && req.body.action.type === 'CHECK_DUPLICATE') {

        var idOwner = req.body.action.id ? req.body.action.id.replace(/\s/g, '_') : null;
        var idToCheck = req.body.action.title.replace(/\s/g, '_');

        postResource(idToCheck).then(function(post) {
            if (post) {
                if (post.id === idOwner) {
                    //update ok
                    return res.status(200).send({
                        status: 200,
                        msg: 'Title update valid.'
                    });
                } else {
                    //duplicate
                    return res.status(401).send({
                        status: 401,
                        errmsg: 'Title duplicate.'
                    });
                }

            } else {
                return res.status(200).send({
                    status: 200,
                    msg: 'Title valid.'
                });
            }
        }, function(err) {
            return res.status(500).send(err);
        });

    } else {
        res.status(500).send({
            errmsg: 'Action not found.'
        })
    }
});
