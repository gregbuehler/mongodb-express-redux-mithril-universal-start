var express = require('express'),
    usersResource = require('./usersResource'),
    userPage = require('../../../client/js/pages/user'),
    sendPage = require('../../utils/sendPage'),
    auth = require('../../utils/auth');

var router = module.exports = express.Router();

// base route '/users'
var baseRoute = '/users';

router.get('/', [auth.requireToken, auth.authorized], function(req, res) {
   
    var resource = usersResource(1);
    
    Promise.all([resource.promiseUsers, resource.promiseCount]).then(function(result) {

        var state = {
            key: baseRoute,
            users: result[0],
            count: result[1],
            page: 1,
            baseRoute: baseRoute
        };
        var ctrl = new userPage.controller();
        ctrl.state = state;

        sendPage(res, userPage.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

router.get('/:page', [auth.requireToken, auth.authorized], function(req, res) {
   
    var resource = usersResource(req.params.page);
    
    Promise.all([resource.promiseUsers, resource.promiseCount]).then(function(result) {

        var state = {
            key: baseRoute,
            users: result[0],
            count: result[1],
            page: req.params.page,
            baseRoute: baseRoute
        };
        var ctrl = new userPage.controller();
        ctrl.state = state;

        sendPage(res, userPage.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

