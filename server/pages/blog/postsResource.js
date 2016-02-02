var Post = require('./postModel'),
    config = require('../../../site/config');

var resource = function(pageNum) {

    var promise = Post.find().sort({
        created: -1
    }).limit(10).select('-_id id title summary created author').populate('author', 'userid');

    return promise;
}

module.exports = resource;


//-------
// var Post = require('./postModel');


// var resource = function(id) {

//     var promise = Post.findOne({
//         id: id
//     }).select('-_id id title summary content created author').populate('author', 'userid');

//     return promise;

// }
// module.exports = resource;
