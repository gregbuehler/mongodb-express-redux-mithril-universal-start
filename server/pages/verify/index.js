var express = require('express'),
    verify = require('../../../client/js/pages/Verify'),
    sendPage = require('../../utils/sendPage'),
    bodyParser = require('body-parser'),
    urlParse = bodyParser.urlencoded({
        extended: true
    }),
    jsonParse = bodyParser.json(),
    User = require('../user/userModel'),
    // Verify = require('../models/Verify.js');
    Verify = require('./verifyModel');

var router = module.exports = express.Router();

// base route '/verify'
router.get('/', function(req, res) {
    sendPage(res, verify);
});

router.get('/:code', [urlParse, jsonParse], function(req, res) {

    Verify.findOne({
            code: req.params.code
        })
        .exec()
        .then(function(verify) {
            if (!verify) {
                return res.status(500).send({
                    status: 500,
                    errmsg: 'Code not found.'
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
                    //     'msg': 'OK'
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

//TODO: page to input the verify code.
// verify a user
// router.post('/verify', [urlParse, jsonParse], function(req, res) {
//     Verify.findOne({
//             code: req.body.token
//         })
//         .exec()
//         .then(function(verify) {
//             if (!verify) {
//                 return res.status(500).send({
//                     status: 500,
//                     errmsg: 'Code not found.'
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
//                         'msg': 'OK'
//                     });
//                 }, function(err) {
//                     return res.status(500).send(err);
//                 });
//         }, function(err) {
//             return res.status(500).send(err);
//         });
// });
