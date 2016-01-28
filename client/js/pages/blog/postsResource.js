var m = require('mithril');

var deferred = m.deferred();

m.request({method: 'GET', url:'/api/blog'}).then(function(posts){
	deferred.resolve(posts);
}, function(err){
	deferred.reject(err);
})

module.exports = deferred.promise;