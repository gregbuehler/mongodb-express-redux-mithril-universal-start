var express = require('express'),
    register = require('../../client/js/pages/Register'),
    sendPage = require('../utils/sendPage');

var router = module.exports = express.Router();

router.get('/', function(req, res) {
    sendPage(res, register);
});
