/**
 * This includes auth-related API endpoints 
 */

var express = require('express'),
    jwt = require('./jwt');

var auth = module.exports = express();

// require an auth-token middleware
auth.requireToken = function(req, res, next) {

    var token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (req.body && req.body.token) {
        token = req.body.token;
    }

    if (!token) {
        return res.status(401).send({
            status: 401,
            errmsg: 'Token not set.'
        });
    }

    jwt.verify(token, function(err, data) {
        if (err) {
            return res.status(401).send({
                status: 401,
                errmsg: err
            });
        }
        req.user = data.claims.user;
        delete req.user.password;
        next();
    });
};

//require 'admin' role
auth.authorized = function(req, res, next) {
    //TODO: allow member to post. owner can CRUD
    if (!(req.user && req.user.role === 'admin')) {

        return res.status(401).send({
            status: 401,
            errmsg: 'You are not admin.'
        });
    }
    next();
}

// // request a verify-reissue
// auth.post('/reissue', [urlParse, jsonParse], function(req, res) {
// });
