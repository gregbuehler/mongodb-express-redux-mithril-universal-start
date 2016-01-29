var m = require('mithril');

var middleware = function(modelName) {
    return function(store) {
        return function(next) {
            return function(action) {
                if (action) {
                    m.request({
                        method: 'POST',
                        url: '/api/' + modelName,
                        data: {
                            action: action
                        }
                    }).then(function(result) {
                        console.log('middleware-result', result);
                    }, function(err) {
                        console.log('middleware-err', err);
                    });
                }
                return next(action);
            }
        }
    }

}

module.exports = middleware;
//-----------------------------------------------
// var middleware = function(socket) {
//     return function(store) {
//         return function(next) {
//             return function(action) {
//                 if (action.meta && action.meta.remote) {
//                     socket.emit('action', action);
//                 }
//                 return next(action);
//             }
//         }
//     }

// }

// module.exports = middleware;
//------------------------------------------------

// export default socket => store => next => action => {
//   if (action.meta && action.meta.remote) {
//     socket.emit('action', action);
//   }
//   return next(action);
// }
