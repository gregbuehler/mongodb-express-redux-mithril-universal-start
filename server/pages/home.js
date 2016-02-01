var express = require('express'),
    home = require('../../client/js/pages/Home'),
    sendPage = require('../utils/sendPage');

var pages = module.exports = express();

pages.get('/', function(req, res) {
    sendPage(res, home);
});
