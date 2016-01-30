var m = require('mithril');
var Auth = require('../../models/Auth.js');

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
                        url: '/apiauth/' + modelName,
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
                    // .then(function(result) {
                    //     console.log('middleware29-result', result);
                    //     return next(action);
                    // }, function(err) {
                    //     console.log('middleware32-err', err);
                    //     return;
                    // });
                }

            }
        }
    }

}

module.exports = middleware;
//----------------------------------------------------

// var m = require('mithril');
// var Auth = require('../../models/Auth.js');

// var middleware = function(modelName) {
//     return function(store) {
//         return function(next) {
//             return function(action) {
//                 if (action) {

//                     if (!Auth.authorized()) {
//                         return;
//                     };

//                     Auth.req({
//                         method: 'POST',
//                         url: '/apiauth/' + modelName,
//                         data: {
//                             action: action
//                         }
//                     }).then(function(result) {
//                         console.log('middleware-result', result);
//                         return next(action);
//                     }, function(err) {
//                         console.log('middleware-err', err);
//                         return;
//                     });
//                 }

//             }
//         }
//     }

// }

// module.exports = middleware;
