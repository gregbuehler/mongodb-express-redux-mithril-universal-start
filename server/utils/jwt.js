var JWT = require('jwt-async');

var jwt = new JWT({
    crypto: {
        algorithm: 'HS512',
        secret: process.env.TOKEN_SECRET || "NOT A SECRET AT ALL, YOU SHOULD TOTES CHANGE IT"
    }
});

module.exports = jwt;
