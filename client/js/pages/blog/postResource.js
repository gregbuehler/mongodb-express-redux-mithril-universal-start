var m = require('mithril');

var resource = function(id) {
    var deferred = m.deferred();

    m.request({
        method: 'GET',
        url: '/api/post/' + id
    }).then(function(post) {
        deferred.resolve(post);
    }, function(err) {
        deferred.reject(err);
    })

    return deferred.promise;
}

module.exports = resource;
