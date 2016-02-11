'use strict';

var postModel = require('../server/pages/blog/postModel');
var mockaroo = require('./mockPost');
var userModel = require('../server/pages/user/userModel');

var seed = function() {
    // console.log('seedPost10-mockaroo', mockaroo);
    var user = new userModel({
        "id": 'zxcvbn',
        "userid": "author",
        "email": "author@author.com",
        "password": "author",
        "verified": true,
        "role": "author"
    });

    userModel.create(user, function(err, author) {
        if (err) {
            return res.status(500).send({
                errmsg: 'Author not created.'
            })
        }


        mockaroo.forEach(function(post) {
            post.id = post.title.replace(/\s/g, '_');
            post.author = author._id;
        })

        postModel.find({}).remove(function() {
            // console.log('this callback is needed for proper remove operation.')
            postModel.create(mockaroo);
        });
    });

}

module.exports = seed;
