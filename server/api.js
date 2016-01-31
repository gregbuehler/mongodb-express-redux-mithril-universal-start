var express = require('express'),
    Post = require('./models/Post'),
    User = require('./models/User'),
    postReducer = require('../client/js/pages/blog/postReducer'),
    userReducer = require('../client/js/pages/user/usersReducer'),
    auth = require('./auth.js');

var api = module.exports = express();

api.get('/blog', function(req, res) {
    Post.find({}).sort({
            created: -1
        }).limit(10).select('id title summary created author').populate('author', 'userid').exec()
        .then(function(posts) {
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
})

api.get('/post/:id', function(req, res) {
    Post.findOne({
            id: req.params.id
        }).select('-_id id title summary content created author').populate('author', 'userid').exec()
        .then(function(post) {
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

//-------------------------------------------------------

// DEMO: Lock API routes down, like this
api.get('/profile', auth.requireToken, function(req, res) {
    res.send(req.user);
});

api.post('/post', [auth.requireToken, auth.authorized], function(req, res) {
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


api.get('/user', [auth.requireToken, auth.authorized], function(req, res) {
    User.find().sort({
            userid: 1
        }).limit(10).select('-_id id userid email verified role').exec()
        .then(function(users) {
            if (users) {
                res.json(users);
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

api.post('/user', [auth.requireToken, auth.authorized], function(req, res) {
    if (req.body.action) {

        var action = req.body.action;
        var types = userReducer.types;

        switch (action.type) {

            case types.CREATE:

                User.create(action.user, function(err, result) {
                    if (err) {
                        res.status(500).send({
                            errmsg: 'User not saved'
                        });
                    } else {
                        res.status(200).send({
                            msg: 'User saved.'
                        });
                    }
                })
                break;

            case types.UPDATE:
                // bcrypt the changed password
                if (action.user.password) {
                    User.encryptPassword(action.user.password, function(err, newpassword) {
                        action.user.password = newpassword;
                        User.update({
                            id: action.user.id
                        }, action.user, function(err, result) {
                            if (err) res.status(500).send(err);
                            res.status(200).send(result);
                        })
                    })
                } else {
                    User.update({
                        id: action.user.id
                    }, action.user, function(err, result) {
                        if (err) res.status(500).send(err);
                        res.status(200).send(result);
                    })
                }
                break;

            case types.REMOVE:
                User.remove({
                    id: action.id
                }, function(err) {
                    if (err) res.status(500).send(err);
                    res.status(200).send({
                        msg: 'User deleted.'
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
