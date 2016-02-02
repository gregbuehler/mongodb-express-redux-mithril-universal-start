var Post = require('./postModel');


var resource = function(id) {

    var promise = Post.findOne({
        id: id
    }).select('-_id id title summary content created author').populate('author', 'userid');

    return promise;

}
module.exports = resource;
