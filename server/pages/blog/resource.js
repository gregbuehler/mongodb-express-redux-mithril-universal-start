// var m = require('mithril'),
var    Post = require('../../models/Post');

// var deferred = m.deferred();

module.exports = Post.find({}).sort({
        created: -1
    }).limit(10).select('id title summary created author').populate('author', 'userid');
//----------------------------------

// var m = require('mithril'),
//     Post = require('../../models/Post');

// var deferred = m.deferred();

// Post.find({}).sort({
//         created: -1
//     }).limit(10).select('id title summary created author').populate('author', 'userid').exec()
//     .then(function(posts) {
//         	console.log('resource11-posts',posts);
//         if (posts) {
//             deferred.resolve(posts);
//         } else {
//             deferred.reject({
//                 status: 401,
//                 errmsg: 'Post not found.'
//             });
//         }
//     }, function(err) {
//         deferred.reject(err);
//     });

// module.exports = deferred.promise;
