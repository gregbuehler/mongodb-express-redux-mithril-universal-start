var express = require('express'),
    register = require('../../../client/js/pages/register/Register'),
    sendPage = require('../../utils/sendPage');


var router = module.exports = express.Router();

// base route '/register'
router.get('/', function(req, res) {
    sendPage(res, register);
});
