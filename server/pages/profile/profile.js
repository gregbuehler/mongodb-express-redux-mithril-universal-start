var express = require('express'),
    profilePage = require('../../../client/js/pages/profile/Profile'),
    User = require('../user/userModel'),
    sendPage = require('../../utils/sendPage'),
    auth = require('../../utils/auth');

var router = module.exports = express.Router();

// base route '/profile'

router.get('/', auth.requireToken, function(req, res) {
    
    var user = req.user;

    var state = {
        key: req.path,
        user: user
    }
    var ctrl = new profile.controller();
    ctrl.state = state;
    sendPage(res, profile.view(ctrl), state);

});

