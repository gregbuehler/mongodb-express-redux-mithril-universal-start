var Post = require('./postModel'),
    config = require('../../../site/config');

var pageSize = config.blogPerPage;

var resource = function(pageNum) {
    var pNum = pageNum - 1;
    var promisePosts = Post.find().select('-_id id title summary created author').limit(pageSize).skip(pNum * pageSize).sort({
        created: -1
    }).populate('author', 'userid');

    var promiseCount = Post.count({});
    return {
        promisePosts: promisePosts,
        promiseCount: promiseCount
    };
}

module.exports = resource;
