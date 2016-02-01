var config = require('../site/config');

var validation = function(password) {
	return config.password_regex.test(password);
}

module.exports = validation;