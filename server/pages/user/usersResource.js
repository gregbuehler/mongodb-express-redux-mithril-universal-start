var User = require('./userModel'),
    config = require('../../../site/config');

var pageSize = config.usersPerPage;

var resource = function(pageNum) {
    var pNum = pageNum - 1;
    var promiseUsers = User.find().select('-_id id userid email verified role').limit(pageSize).skip(pNum * pageSize).sort({
        userid: 1
    }).populate('author', 'userid');

    var promiseCount = User.count({});
    return {
        promiseUsers: promiseUsers,
        promiseCount: promiseCount
    };
}

module.exports = resource;


