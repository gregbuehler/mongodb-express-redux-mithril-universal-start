'use strict';

// Development specific configuration
// =================================

var config = {};
config.ip = 'http://localhost';

config.port = 3000;
config.baseUrl = config.ip + ':' + config.port;


// MongoDB connection options
config.mongo = {
    uri: 'mongodb://localhost/merm-dev',
    options: {
        db: {
            safe: true
        }
    }
};

config.seedDB = true;
config.useUserEmailVerify = true;
config.siteEmail = 'sharelinky@gmail.com';

module.exports = config;
