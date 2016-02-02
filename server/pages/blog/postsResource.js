// var Post = require('../../models/Post');
var Post = require('./postModel');

var promise = Post.find().sort({
    created: -1
}).limit(10).select('-_id id title summary created author').populate('author', 'userid');

module.exports = promise;

