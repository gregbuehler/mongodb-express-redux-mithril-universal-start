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
        "id": "qwerty",
        "userid": "test",
        "email": "test@test.com",
        "password": "test",
        "verified": true,
        "role": "member"
    }, {
        "id": "asdfgh",
        "userid": "admin",
        "email": "admin@admin.com",
        "password": "admin",
        "verified": true,
        "role": "admin"
    }]);
}

module.exports = seed;
