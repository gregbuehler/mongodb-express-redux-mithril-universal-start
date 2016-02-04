var express = require('express'),
    profilePage = require('../../../client/js/pages/Profile'),
    User = require('../user/userModel'),
    sendPage = require('../../utils/sendPage'),
    auth = require('../../utils/auth');

var router = module.exports = express.Router();

// base route '/profile'
// router.get('/', auth.requireToken, function(req, res) {
//     User.findOne({}).exec()
//         .then(function(user) {
//             if (user) {

//                 user = user.toObject();
//                 delete user.password;

//                 if (!user.verified) {
//                     return res.status(401).send({
//                         status: 401,
//                         errmsg: 'User not verified.'
//                     });
//                 } else {

//                     var state = {
//                         key: req.path,
//                         user: user
//                     }
//                     var ctrl = new profile.controller();
//                     ctrl.state = state;
//                     sendPage(res, profile.view(ctrl), state);
//                 }

//             } else {
//                 return res.status(401).send({
//                     status: 401,
//                     errmsg: 'User not found.'
//                 });
//             }
//         }, function(err) {
//             return res.status(500).send(err);
//         });
// });
//------------------------------------

router.get('/', auth.requireToken, function(req, res) {
    
    var user = req.user;

    var state = {
        key: req.path,
        user: user
    }
    var ctrl = new profile.controller();
    ctrl.state = state;
    sendPage(res, profile.view(ctrl), state);

});

// // DEMO: Lock API routes down, like this
// router.get('/api', auth.requireToken, function(req, res) {
//     res.send(req.user);
// });
