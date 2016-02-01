var express = require('express'),
    login = require('../../client/js/pages/Login'),
    sendPage = require('../utils/sendPage');

// var pages = module.exports = express();
var router = module.exports = express.Router();

// base route '/login'
router.get('/', function(req, res) {
    sendPage(res, login);
});
