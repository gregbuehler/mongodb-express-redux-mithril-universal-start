var express = require('express'),
    register = require('../../../client/js/pages/Register'),
    sendPage = require('../utils/sendPage');


var router = module.exports = express.Router();

// base route '/register'
router.get('/', function(req, res) {
    sendPage(res, register);
});

// // register new login credentials
// router.post('/', [urlParse, jsonParse], function(req, res) {
//     var err;

//     if (!userid_validation(req.body.userid)) {
//         err = {
//             errmsg: 'Userid should be alphanumeric 4 ~ 20 length.'
//         };
//         return res.status(500).send(err);
//     };
//     if (!email_validation(req.body.email)) {
//         err = {
//             errmsg: 'Email is not valid.'
//         };
//         return res.status(500).send(err);
//     };
//     if (!password_validation(req.body.password)) {
//         err = {
//             errmsg: 'Password should be any character 4 ~ 20 length.'
//         };
//         return res.status(500).send(err);
//     };
//     if (req.body.password !== req.body.password2) {
//         err = {
//             errmsg: 'Password must match.'
//         };
//         return res.status(500).send(err);
//     }
//     var user = new User({
//     	id: req.body.id,
//         userid: req.body.userid,
//         email: req.body.email,
//         password: req.body.password
//     });

//     user.save(function(err, u) {
//         if (err) {
//             err.status = 500;
//             return res.status(500).send(err);
//         }
//         var verify = new Verify({
//             user: user
//         });
//         verify.save();

//         // TODO: implement a user email here
//         if (config.useUserEmailVerify === true) {

//             transporter.sendMail({
//                 from: config.siteEmail,
//                 to: user.email,
//                 subject: 'Verify your email',
//                 text: 'Welcome! ' + user.userid + '. Copy and paste the following link into your browser to verify your email \n\r ' + config.baseUrl + '/auth/verify/' + verify.code
//             });
//         } else {
//             console.log('User ' + user.userid + ' signed up. Verify with /verify/' + verify.code);
//         }

//         return res.send({
//             'msg': 'OK'
//         });
//     });
// });
