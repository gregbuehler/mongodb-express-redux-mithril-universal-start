var express = require('express'),
    userPage = require('../../../client/js/pages/user'),
    usersResource = require('./usersResource'),
    usersReducer = require('../../../client/js/pages/user/usersReducer'),
    sendPage = require('../../utils/sendPage'),
    auth = require('../../utils/auth');

var router = module.exports = express.Router();

// base route '/user'
router.get('/', [auth.requireToken, auth.authorized], function(req, res) {
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

router.get('/api', [auth.requireToken, auth.authorized], function(req, res) {
    usersResource.then(function(users) {
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


router.post('/', [auth.requireToken, auth.authorized], function(req, res) {
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
