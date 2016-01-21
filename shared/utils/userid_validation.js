var config = require('../../site/config');

var validation = function(userid) {
    return config.userid_regex.test(userid);
}

module.exports = validation;
