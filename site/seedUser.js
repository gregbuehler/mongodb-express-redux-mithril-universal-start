/**
 * Populate DB with sample data on server start.
 * To disable, edit site/config/environment/development.js, and set `config.seedUser = false`
 */
'use strict';
var userModel = require('../server/models/User');

var seed = function() {

    userModel.find({}).remove(function() {
        // console.log('this callback is needed for proper remove operation.')
    });

    userModel.create([{
        "userid": "test",
        "email": "test@test.com",
        "password": "1111",
        "verified": true,
        "role": "member"
    }, {
        "userid": "admin",
        "email": "admin@admin.com",
        "password": "1111",
        "verified": true,
        "role": "admin"
    }]);
}

module.exports = seed;
