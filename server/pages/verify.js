var express = require('express'),
    verify = require('../../client/js/pages/Verify'),
    sendPage = require('../utils/sendPage');

var router = module.exports = express.Router();

// base route '/verify'
router.get('/', function(req, res) {
    sendPage(res, verify);
});
