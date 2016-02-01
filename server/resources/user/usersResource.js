var User = require('../../models/User');

var promise = User.find().sort({
    userid: 1
}).limit(10).select('-_id id userid email verified role');

module.exports = promise;

