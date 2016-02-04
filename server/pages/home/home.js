var express = require('express'),
    home = require('../../../client/js/pages/home/Home'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/'
router.get('/', function(req, res) {
    sendPage(res, home);
});
