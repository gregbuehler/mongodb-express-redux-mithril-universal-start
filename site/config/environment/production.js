'use strict';

// Production specific configuration
// =================================

var config = {};
config.env = 'production';
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

// config.seedUser = true;
// config.seedPost = true;
config.useOnlyAdminCanPost = true;
config.useUserEmailVerify = true;
config.useServerRender = true;
config.useClientRender = true; //if commented out, only server-side rendering is used.
// config.useBrowsersync = true; //for development purpose only
config.useBlog = true;
config.siteEmail = 'sharelinky@gmail.com';
config.userid_regex = /^[a-z][a-z0-9]{3,19}$/i;// 4~20 alphanumeric. Starting with alphabet. All lowercase.
config.email_regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
config.password_regex = /^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+\|\{\}:"<>\?\-=\\\[\];',\.\/]{4,20}$/;//4~20 any characters. Case-sensitive.



module.exports = config;