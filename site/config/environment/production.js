'use strict';

// Production specific configuration
// =================================
var config = {};
config.ip = process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined;

config.port = process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080;

config.baseUrl = config.ip + ':' + config.port;


// MongoDB connection options
config.mongo = {
    uri: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
        'mongodb://merm-prod:1234@ds037185.mongolab.com:37185/merm-prod',
    options: {
        db: {
            safe: true
        }
    }
};

config.seedDB = false;
config.useUserEmailVerification = true;
config.siteEmail = 'sharelinky@gmail.com';


module.exports = config;