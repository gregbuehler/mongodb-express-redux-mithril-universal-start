/**
 * Populate DB with sample data on server start.
 * To disable, edit site/config/environment/development.js, and set `config.seedDB = false`
 */
'use strict';
var userModel = require('../server/models/User');

var seed = function() {

    userModel.find({}).remove(function() {
        // console.log('this callback is needed for proper remove operation.')
    });

    //userid is 'tasty', password is '1111'
    userModel.create({
        "userid": "tasty",
        "email": "tasty@tasty.com",
        "password": "$2a$10$.ZT9B.nfQ76kXoCX7b8lNOddfYRB4AaL.ImaTNjXzeuO.gTfpascC",
        "verified": true,
    });
}

module.exports = seed;
