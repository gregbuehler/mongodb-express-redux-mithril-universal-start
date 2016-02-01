/**
 * Populate DB with sample data on server start.
 * To disable, edit site/config/environment/development.js, and set `config.seedUser = false`
 */
'use strict';
// var verifyModel = require('../server/models/User');
var verifyModel = require('../server/pages/verify/verifyModel');

var seed = function() {

    verifyModel.find({}).remove(function() {
        // console.log('this callback is needed for proper remove operation.')
    });
}

module.exports = seed;