var Post = require('./postModel'),
    config = require('../../../site/config');

var pageSize = config.blogPageSize;

var resource = function(pageNum) {

    var promise = Post.find().select('-_id id title summary created author').limit(pageSize).skip(pageNum*pageSize).sort({
        created: -1
    }).populate('author', 'userid');

    return promise;
}

module.exports = resource;

