var express = require('express'),
    blog = require('../../../client/js/pages/blog'),
    postsResource = require('./postsResource'),
    sendPage = require('../../utils/sendPage');

var router = module.exports = express.Router();

// base route '/blog'
var baseRoute = '/blog';

router.get('/', function(req, res) {
    var resource = postsResource(0);
    Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

        var state = {
            key: baseRoute,
            posts: result[0],
            count: result[1],
            pagenum: 0
        };
        var ctrl = new blog.controller();
        ctrl.state = state;

        sendPage(res, blog.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});


router.get('/api', function(req, res) {
    // console.log('server/blog/index33-req.path-req.params', req.path, req.params);

    var resource = postsResource(0);
    Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

        // var posts = result[0];

        if (result) {
            var state = {
                key: baseRoute + req.path,
                posts: result[0],
                count: result[1],
                pagenum: 0
            };

            res.json(state);
        } else {
            return res.status(401).send({
                status: 401,
                errmsg: 'Post not found.'
            });
        }
    }, function(err) {
        return res.status(500).send(err);
    });
});

router.get('/:pagenum', function(req, res) {
    // console.log('server/blog/index58-req.path-req.params', req.path, req.params);

    var resource = postsResource(parseInt(req.params.pagenum, 10) - 1);
    Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

        var state = {
            key: baseRoute + req.path,
            posts: result[0],
            count: result[1],
            pagenum: parseInt(req.params.pagenum, 10) - 1
        };
        var ctrl = new blog.controller();
        ctrl.state = state;

        sendPage(res, blog.view(ctrl), state);

    }, function(err) {
        res.status(500).send(err)
    });
});

router.get('/:pagenum/api', function(req, res) {
    // console.log('server/blog/index78-req.body-req.params', req.path, req.params);
    
    var resource = postsResource(parseInt(req.params.pagenum, 10) - 1);
    Promise.all([resource.promisePosts, resource.promiseCount]).then(function(result) {

        // var posts = result[0];

        if (result) {
            var state = {
                key: baseRoute + req.path,
                posts: result[0],
                count: result[1],
                pagenum: parseInt(req.params.pagenum, 10) - 1
            };

            res.json(state);
        } else {
            return res.status(401).send({
                status: 401,
                errmsg: 'Post not found.'
            });
        }
    }, function(err) {
        return res.status(500).send(err);
    });
});

// router.get('/api', function(req, res) {

//     postsResource().then(function(posts) {
//         if (posts) {
//             res.json(posts);
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

// router.get('/:pagenum', function(req, res) {

//     postsResource(req.params.pagenum).then(function(posts) {

//         var state = {
//             key: req.path,
//             posts: posts,
//             pagenum: req.params.pagenum
//         };
//         var ctrl = new blog.controller();
//         ctrl.state = state;

//         sendPage(res, blog.view(ctrl), state);

//     }, function(err) {
//         res.status(500).send(err)
//     });
// });

// router.get('/:pagenum/api', function(req, res) {

//     postsResource(req.params.pagenum).then(function(posts) {
//         if (posts) {
//             res.json(posts);
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
