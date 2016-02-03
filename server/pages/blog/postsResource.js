var Post = require('./postModel'),
    config = require('../../../site/config');

var pageSize = config.blogPageSize;

var resource = function(pageNum) {

    var promisePosts = Post.find().select('-_id id title summary created author').limit(pageSize).skip(pageNum*pageSize).sort({
        created: -1
    }).populate('author', 'userid');

    var promiseCount = Post.count({});
    return { promisePosts: promisePosts, promiseCount: promiseCount };
}

module.exports = resource;


//------------------------------
// var Post = require('./postModel'),
//     config = require('../../../site/config');

// var pageSize = config.blogPageSize;

// var resource = function(pageNum) {

//     var promise = Post.find().select('-_id id title summary created author').limit(pageSize).skip(pageNum*pageSize).sort({
//         created: -1
//     }).populate('author', 'userid');

//     return promise;
// }

// module.exports = resource;

