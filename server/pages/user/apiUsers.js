var express = require('express'),
    User = require('./userModel'),
    usersResource = require('./usersResource'),
    usersReducer = require('../../../client/js/pages/user/usersReducer'),
    auth = require('../../utils/auth'),
    bodyParser = require('body-parser'),
    urlParse = bodyParser.urlencoded({
        extended: true
    }),
    jsonParse = bodyParser.json();

var router = module.exports = express.Router();

// base route '/users'
var baseRoute = '/users';

router.get('/', [auth.requireToken, auth.authorized], function(req, res) {
    
    var resource = usersResource(1);
    
    Promise.all([resource.promiseUsers, resource.promiseCount]).then(function(result) {

        if (result) {
            var state = {
                key: baseRoute,
                users: result[0],
                count: result[1],
                page: 1,
                baseRoute: baseRoute
            };

            res.json(state);
        } else {
            return res.status(401).send({
                status: 401,
                errmsg: 'Users not found.'
            });
        }
    }, function(err) {
        return res.status(500).send(err);
    });
})

router.get('/:page/api', [auth.requireToken, auth.authorized], function(req, res) {
    
    var resource = usersResource(req.params.page);
    
    Promise.all([resource.promiseUsers, resource.promiseCount]).then(function(result) {

        if (result) {
            var state = {
                key: baseRoute,
                users: result[0],
                count: result[1],
                page: req.params.page,
                baseRoute: baseRoute
            };

            res.json(state);
        } else {
            return res.status(401).send({
                status: 401,
                errmsg: 'Users not found.'
            });
        }
    }, function(err) {
        return res.status(500).send(err);
    });
})

router.post('/', [auth.requireToken, auth.authorized, urlParse, jsonParse], function(req, res) {
    if (req.body.action) {

        var action = req.body.action;
        var types = usersReducer.types;

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
