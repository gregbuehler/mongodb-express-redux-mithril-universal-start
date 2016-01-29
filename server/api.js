var express = require('express'),
    Post = require('./models/Post');

var api = module.exports = express();

api.get('/blog', function(req, res) {
    Post.find({}).sort({
            created: -1
        }).limit(10).select('id title summary created author').populate('author', 'userid').exec()
        .then(function(posts) {
            if (posts) {
                res.json(posts);
            } else {
                return res.status(401).send({
                    status: 401,
                    errmsg: 'Post not found.'
                });
            }
        }, function(err) {
            return res.status(500).send(err);
        });
})

api.get('/post/:id', function(req, res) {
    Post.findOne({
            id: req.params.id
        }).select('-_id id title summary content created author').populate('author', 'userid').exec()
        .then(function(post) {
            if (post) {
                res.json(post);
            } else {
                return res.status(401).send({
                    status: 401,
                    errmsg: 'Post not found.'
                });
            }
        }, function(err) {
            return res.status(500).send(err);
        });
})

api.post('/post', function(req, res){
    res.status(200).send({msg:'ok'})
    console.log('api43-req.body', req.body);
    console.log('api43-req.body', req.params);
    console.log('api43-req.body', req.path);
    console.log('api43-req.body', req.data);
})
