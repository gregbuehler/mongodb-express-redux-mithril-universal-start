var express = require('express'),
    login = require('../../../client/js/pages/login/Login'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/login'
router.get('/', function(req, res) {
    sendPage(res, login);
});
