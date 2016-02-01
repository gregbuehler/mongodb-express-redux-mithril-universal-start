var express = require('express'),
    login = require('../../client/js/pages/Login'),
    sendPage = require('../utils/sendPage');

// var pages = module.exports = express();
var router = module.exports = express.Router();

router.get('/', function(req, res) {
    sendPage(res, login);
});
