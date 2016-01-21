var config = require('../../site/config');

var validation = function(email) {
    return config.email_regex.test(email);
}

module.exports = validation;
