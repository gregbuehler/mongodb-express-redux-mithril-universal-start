var express = require('express'),
    logout = require('../../client/js/pages/Logout'),
    sendPage = require('../utils/sendPage');

var router = module.exports = express.Router();

router.get('/', function(req, res) {
    sendPage(res, logout);
});
