var m = require('mithril');
var Auth = require('./Auth.js');

var middleware = function(modelName) {
    return function(store) {
        return function(next) {
            return function(action) {
                if (action) {

                    if (!Auth.authorized()) {
                        return;
                    };

                    Auth.req({
                        method: 'POST',
                        // url: '/api/' + modelName,
                        url: '/' + modelName,
                        data: {
                            action: action
                        },
                        unwrapSuccess: function(result) {
                            console.log('middleware21-result', result);
                            return next(action);
                        },
                        unwrapError: function(err) {
                            console.log('middleware25-err', err);
                            return;
                        }
                    });
                }
            }
        }
    }

}

module.exports = middleware;
