var m = require('mithril');
console.log('postResource2-called');
var deferred = m.deferred();

m.request({method: 'GET', url:'/api/blog'}).then(function(posts){
	console.log('postsResource6-posts', posts)
	deferred.resolve(posts);
}, function(err){
	deferred.reject(err);
})

module.exports = deferred.promise;