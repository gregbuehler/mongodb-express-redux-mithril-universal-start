var express = require('express'),
    logout = require('../../../client/js/pages/logout/Logout'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/logout'
router.get('/', function(req, res) {
    sendPage(res, logout);
});
