var express = require('express'),
    auth = require('../../utils/auth');

var router = module.exports = express.Router();

// DEMO: Lock API routes down, like this
router.get('/', auth.requireToken, function(req, res) {
    res.send(req.user);
});