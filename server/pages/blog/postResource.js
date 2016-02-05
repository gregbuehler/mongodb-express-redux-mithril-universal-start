var Post = require('./postModel');

var resource = function(id, title) {
	var promise;

    if (title) {
        promise = Post.findOne({
            title: title
        }).select('-_id id title summary content created author').populate('author', 'userid');

        return promise;

    } else if (id) {

        promise = Post.findOne({
            id: id
        }).select('-_id id title summary content created author').populate('author', 'userid');

        return promise;
    }

}
module.exports = resource;
