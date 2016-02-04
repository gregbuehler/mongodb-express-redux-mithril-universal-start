var express = require('express'),
    blog = require('../../../client/js/pages/blog'),
    postsResource = require('./postsResource'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/blog'
var baseRoute = '/blog';

router.get('/', function(req, res) {
    var resource = postsResource(1);
    Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

        var state = {
            key: baseRoute,
            posts: result[0],
            count: result[1],
            page: 1,
            baseRoute: baseRoute
        };
        var ctrl = new blog.controller();
        ctrl.state = state;

        sendPage(res, blog.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});


// router.get('/api', function(req, res) {

//     var resource = postsResource(1);
//     Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

//         if (result) {
//             var state = {
//                 key: baseRoute,
//                 posts: result[0],
//                 count: result[1],
//                 page: 1,
//                 baseRoute: baseRoute
//             };

//             res.json(state);
//         } else {
//             return res.status(401).send({
//                 status: 401,
//                 errmsg: 'Post not found.'
//             });
//         }
//     }, function(err) {
//         return res.status(500).send(err);
//     });
// });

router.get('/:page', function(req, res) {

    var resource = postsResource(req.params.page);
    Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

        var state = {
            key: baseRoute + '/' + req.params.page,
            posts: result[0],
            count: result[1],
            page: req.params.page,
            baseRoute: baseRoute
        };
        var ctrl = new blog.controller();
        ctrl.state = state;

        sendPage(res, blog.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

// router.get('/:page/api', function(req, res) {

//     var resource = postsResource(req.params.page);
//     Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

//         if (result) {
//             var state = {
//                 key: baseRoute + '/' + req.params.page,
//                 posts: result[0],
//                 count: result[1],
//                 page: req.params.page,
//                 baseRoute: baseRoute
//             };

//             res.json(state);
//         } else {
//             return res.status(401).send({
//                 status: 401,
//                 errmsg: 'Post not found.'
//             });
//         }
//     }, function(err) {
//         return res.status(500).send(err);
//     });
// });

