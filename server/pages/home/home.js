var express = require('express'),
    home = require('../../../client/js/pages/home/Home'),
    sendPage = require('../../utils/sendPage');

// var pages = module.exports = express();
var router = module.exports = express.Router();

// base route '/'
router.get('/', function(req, res) {
    sendPage(res, home);
});
