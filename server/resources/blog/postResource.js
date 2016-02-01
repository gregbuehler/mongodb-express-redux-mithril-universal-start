var Post = require('../../models/Post');


var resource = function(id) {
	// console.log(req.params);
    var promise = Post.findOne({
        id: id
    }).select('-_id id title summary content created author').populate('author', 'userid');

    return promise;

}
module.exports = resource;
