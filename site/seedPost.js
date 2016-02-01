/**
 * Populate DB with sample data on server start.
 * To disable, edit site/config/environment/development.js, and set `config.seedUser = false`
 */
'use strict';
// var postModel = require('../server/models/Post');
var postModel = require('../server/pages/blog/postModel');
var mockaroo = require('./mockPost');
// var userModel = require('../server/models/User');
var userModel = require('../server/pages/user/userModel');

var seed = function() {
    // console.log('seedPost10-mockaroo', mockaroo);
    var author = new userModel({
        "id": 'zxcvbn',
        "userid": "author",
        "email": "author@author.com",
        "password": "1111",
        "verified": true,
        "role": "member"
    });

    author.save();

    mockaroo.forEach(function(post){
        post.id = post.title.replace(/\s/g, '_');
        post.author = author._id;
    })

    postModel.find({}).remove(function() {
        // console.log('this callback is needed for proper remove operation.')
    });

    postModel.create(mockaroo);
}

module.exports = seed;
