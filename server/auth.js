/**
 * This includes auth-related API endpoints 
 */

var express = require('express'),
    JWT = require('jwt-async'),
    bodyParser = require('body-parser'),
    urlParse = bodyParser.urlencoded({
        extended: true
    }),
    User = require('./models/User.js'),
    Verify = require('./models/Verify.js'),
    jsonParse = bodyParser.json(),
    config = require('../site/config'),
    userid_validation = require('../utils/userid_validation'),
    email_validation = require('../utils/email_validation'),
    password_validation = require('../utils/password_validation');

if (config.useUserEmailVerify === true) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport();
}


var auth = module.exports = express();

var jwt = new JWT({
    crypto: {
        algorithm: 'HS512',
        secret: process.env.TOKEN_SECRET || "NOT A SECRET AT ALL, YOU SHOULD TOTES CHANGE IT"
    }
});


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
            message: 'Token not set.'
        });
    }

    jwt.verify(token, function(err, data) {
        if (err) {
            return res.status(401).send({
                status: 401,
                message: err
            });
        }
        req.user = data.claims.user;
        delete req.user.password;
        next();
    });
};

// get JWT token for login credentials
auth.post('/login', [urlParse, jsonParse], function(req, res) {
// auth.get('/login', [urlParse, jsonParse], function(req, res) {

//     req.body.userid = req.query.userid;
//     req.body.password = req.query.password;
//     console.log(req.body.password);
    if (!userid_validation(req.body.userid)) {
        var err = {
            'error': 'Userid should be alphanumeric 4 ~ 20 length.'
        };
        return res.status(500).send(err);
    };
    if (!password_validation(req.body.password)) {
        var err = {
            'error': 'Password should be any character 4 ~ 20 length.'
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
                        message: 'User not verified.'
                    });
                }
                user.verifyPassword(req.body.password, function(err, isMatch) {
                    if (err) {
                        return res.status(500).send({
                            status: 500,
                            message: 'Database error.'
                        });
                    }
                    if (!isMatch) {
                        return res.status(401).send({
                            status: 401,
                            message: 'Bad password.'
                        });
                    }
                    delete user.password;
                    jwt.sign({
                        user: user
                    }, function(err, token) {
                        if (err) {
                            return res.status(500).send({
                                status: 500,
                                message: err.message
                            });
                        }
                        return res.send({
                            token: token
                        });
                    });
                });
            } else {
                return res.status(401).send({
                    status: 401,
                    message: 'User not found.'
                });
            }
        }, function(err) {
            return res.status(500).send(err);
        });
});

// register new login credentials
auth.post('/register', [urlParse, jsonParse], function(req, res) {

    if (!userid_validation(req.body.userid)) {
        var err = {
            'error': 'Userid should be alphanumeric 4 ~ 20 length.'
        };
        return res.status(500).send(err);
    };
    if (!email_validation(req.body.email)) {
        var err = {
            'error': 'Email is not valid.'
        };
        return res.status(500).send(err);
    };
    if (!password_validation(req.body.password)) {
        var err = {
            'error': 'Password should be any character 4 ~ 20 length.'
        };
        return res.status(500).send(err);
    };
    if (req.body.password !== req.body.password2) {
        var err = {
            'error': 'Password must match.'
        };
        return res.status(500).send(err);
    }
    var user = new User({
        userid: req.body.userid,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err, u) {
        if (err) {
            err.status = 500;
            return res.status(500).send(err);
        }

        var verify = new Verify({
            user: user
        });
        verify.save();

        // TODO: implement a user email here
        if (config.useUserEmailVerify === true) {

            transporter.sendMail({
                from: config.siteEmail,
                to: user.email,
                subject: 'Verify your email',
                text: 'Welcome! ' + user.userid + '. Copy and paste the following link into your browser to verify your email \n\r ' + config.baseUrl + '/auth/verify/' + verify.code
            });
        } else {
            console.log('User ' + user.email + ' signed up. Verify with /verify/' + verify.code);
        }


        return res.send({
            'message': 'OK'
        });
    });
});

// verify a user
// auth.post('/verify', [urlParse, jsonParse], function(req, res) {
//     Verify.findOne({
//             code: req.body.token
//         })
//         .exec()
//         .then(function(verify) {
//             if (!verify) {
//                 return res.status(500).send({
//                     status: 500,
//                     message: 'Code not found.'
//                 });
//             }
//             User.findOneAndUpdate({
//                     _id: verify.user
//                 }, {
//                     verified: true
//                 }).exec()
//                 .then(function() {
//                     verify.remove();
//                     return res.send({
//                         'message': 'OK'
//                     });
//                 }, function(err) {
//                     return res.status(500).send(err);
//                 });
//         }, function(err) {
//             return res.status(500).send(err);
//         });
// });

auth.get('/verify/:code', [urlParse, jsonParse], function(req, res) {

    Verify.findOne({
            code: req.params.code
        })
        .exec()
        .then(function(verify) {
            if (!verify) {
                return res.status(500).send({
                    status: 500,
                    message: 'Code not found.'
                });
            }
            User.findOneAndUpdate({
                    _id: verify.user
                }, {
                    verified: true
                }).exec()
                .then(function(user) {
                    verify.remove();
                    // return res.send({
                    //     'message': 'OK'
                    // });
                    // res.sendFile(path.join(buildDir, 'index.html'));
                    res.redirect('/login');
                }, function(err) {
                    return res.status(500).send(err);
                });
        }, function(err) {
            return res.status(500).send(err);
        });
});

// get user info
auth.get('/user', auth.requireToken, function(req, res) {
    res.send(req.user);
});

// request a verify-reissue
auth.post('/reissue', [urlParse, jsonParse], function(req, res) {

});
