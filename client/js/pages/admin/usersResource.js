var m = require('mithril');
var Auth = require('../../models/Auth.js');

var deferred = m.deferred();

Auth.req({method: 'GET', url:'/apiauth/user'}).then(function(users){
	deferred.resolve(users);
}, function(err){
	deferred.reject(err);
})

module.exports = deferred.promise;
