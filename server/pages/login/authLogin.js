var express = require('express'),
    bodyParser = require('body-parser'),
    urlParse = bodyParser.urlencoded({
        extended: true
    }),
    User = require('../user/userModel'),
    jsonParse = bodyParser.json(),
    userid_validation = require('../../../shared/userid_validation'),
    email_validation = require('../../../shared/email_validation'),
    password_validation = require('../../../shared/password_validation'),
    jwt = require('../../utils/jwt');

var router = module.exports = express.Router();

// get JWT token for login credentials
router.post('/', [urlParse, jsonParse], function(req, res) {

    if (!userid_validation(req.body.userid)) {
        var err = {
            errmsg: 'Userid should be alphanumeric 4 ~ 20 length.'
        };
        return res.status(500).send(err);
    };
    if (!password_validation(req.body.password)) {
        var err = {
            errmsg: 'Password should be any character 4 ~ 20 length.'
        };
        return res.status(500).send(err);
    };

    User.findOne({
            userid: req.body.userid
        }).exec()
        .then(function(user) {
            if (user) {
                if (!user.verified) {
                    return res.status(401).send({
                        status: 401,
                        errmsg: 'User not verified.'
                    });
                }
                user.verifyPassword(req.body.password, function(err, isMatch) {
                    if (err) {
                        return res.status(500).send({
                            status: 500,
                            errmsg: 'Database error.'
                        });
                    }
                    if (!isMatch) {
                        return res.status(401).send({
                            status: 401,
                            errmsg: 'Bad password.'
                        });
                    }

                    user = user.toObject();
                    delete user.password;

                    jwt.sign({
                        user: user
                    }, function(err, token) {
                        if (err) {
                            return res.status(500).send({
                                status: 500,
                                errmsg: err.errmsg
                            });
                        }
                        return res.send({
                            token: token,
                            userid: user.userid,
                            role: user.role
                        });
                    });
                });
            } else {
                return res.status(401).send({
                    status: 401,
                    errmsg: 'User not found.'
                });
            }
        }, function(err) {
            return res.status(500).send(err);
        });
});
