var express = require('express'),
    Post = require('./models/Post');
var postReducer = require('../client/js/pages/blog/postReducer');


var api = module.exports = express();

// api.get('/blog', function(req, res) {
//     Post.find({}).sort({
//             created: -1
//         }).limit(10).select('id title summary created author').populate('author', 'userid').exec()
//         .then(function(posts) {
//             if (posts) {
//                 res.json(posts);
//             } else {
//                 return res.status(401).send({
//                     status: 401,
//                     errmsg: 'Post not found.'
//                 });
//             }
//         }, function(err) {
//             return res.status(500).send(err);
//         });
// })

// api.get('/post/:id', function(req, res) {
//     Post.findOne({
//             id: req.params.id
//         }).select('-_id id title summary content created author').populate('author', 'userid').exec()
//         .then(function(post) {
//             if (post) {
//                 res.json(post);
//             } else {
//                 return res.status(401).send({
//                     status: 401,
//                     errmsg: 'Post not found.'
//                 });
//             }
//         }, function(err) {
//             return res.status(500).send(err);
//         });
// })

api.post('/post', function(req, res) {
    if (req.body.action) {

        var action = req.body.action;
        var types = postReducer.types;

            console.log('apiAuth50-action', action);
        switch (action.type) {

            case types.CREATE:
                
                action.post.author = req.user._id;

                Post.create(action.post, function(err, result) {
                    if (err) res.status(500).send(err);
                    res.status(200).send(result);
                })
                break;
            case types.UPDATE:
                Post.update({
                    id: action.post.id
                }, action.post, function(err, result) {
                    if (err) res.status(500).send(err);
                    res.status(200).send(result);
                })
                break;

            case types.REMOVE:
                Post.remove({
                    id: action.id
                }, function(err) {
                    if (err) res.status(500).send(err);
                    res.status(200).send({
                        msg: 'Post deleted.'
                    });
                })
                break;
            default:
                res.status(500).send({
                    errmsg: 'Action is invalid.'
                })
        }
    } else {

        res.status(500).send({
            errmsg: 'Action not found.'
        })
    }
})
