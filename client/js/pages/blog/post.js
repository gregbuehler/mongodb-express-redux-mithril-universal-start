var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var redux = require('redux');
var reducer = require('./postReducer');
var postResource = !global.__server__ ? require('./postResource') : null;
var postForm = require('./postForm');

var post = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();

            if (window.__state__[key]) {

                console.log('from window');
                ctrl.state = window.__state__[key];
                window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);
                window.__state__[key] = null;

            } else if (!window.__store__[key]) {

                console.log('from server', m.route.param('id'));

                postResource(m.route.param('id')).then(function(post) {

                    ctrl.state = {
                        key: key,
                        post: post
                    };
                    window.__store__[key] = redux.createStore(reducer.reducer, ctrl.state);
                })
            } else {
                ctrl.state = window.__store__[key].getState();
            };



            ctrl.isEdit = false;

            ctrl.edit = function() {
                return function() {
                    ctrl.isEdit = !ctrl.isEdit;
                }
            }
            // ctrl.save = function() {
            //     return function(post) {
            //     	console.log('post53-post', post);
            //     	console.log('post54-post', postForm.controller.getPost());
            //         ctrl.isEdit = false;
            //         window.__store__[key].dispatch(reducer.updatePost(post))
            //         ctrl.state = window.__store__[key].getState();
            //         console.log(ctrl.state);
            //     }
            // }

            ctrl.save = function(po) {
                // confirm('Save this post?');
                console.log(po);
                ctrl.isEdit = false;
                window.__store__[key].dispatch(reducer.updatePost(po))
                ctrl.state = window.__store__[key].getState();
                console.log(ctrl.state);
            }

            ctrl.remove = function() {
                return function() {
                    if (confirm('Delete this post?')) {

                        ctrl.isEdit = false;
                        var postId = ctrl.state.post.id;
                        //remove post from state
                        window.__store__[key].dispatch(reducer.removePost(postId))

                        //also remove post from the post list state
                        // if (window.__store__['/blog']) {
                        //     window.__store__['/blog'].dispatch(reducer.removePost(postId))
                        // }
                        m.route('/blog')

                    }
                }
            }
            ctrl.cancel = function() {
                return function() {
                    ctrl.isEdit = !ctrl.isEdit;
                }
            }

        }


    },
    view: function(ctrl) {
        var post = ctrl.state.post;

        return [
            m.component(Navbar),
            m('.container',
                m('.col-md-12', (!ctrl.isEdit ?
                    m('', [
                        m('h1', m('div', post.title)),
                        m("h5", [
                            m("span", post.author.userid),
                            " - ",
                            m("span", post.created),
                            m('.pull-right', [m('span.label.label-default', {
                                onclick: ctrl.edit()
                            }, 'edit'), m('span.label.label-danger', {
                                onclick: ctrl.remove()
                            }, 'delete')])
                        ]),
                        m('p', post.summary),
                        m('p', post.content),
                        // m('p', 'Written by ' + post.author.userid),
                        m('hr')
                    ]) :
                    m.component(postForm, {
                        // post: JSON.parse(JSON.stringify(post)),
                        post: post,
                        save: ctrl.save,
                        remove: ctrl.remove,
                        cancel: ctrl.cancel
                    })
                ))
            )
        ]
    }
}

module.exports = post;
//------------------------------------------------

// var m = require('mithril');
// var Navbar = require('../../components/Navbar.js');
// var redux = require('redux');
// var reducer = require('./reducer');
// var postResource = !global.__server__ ? require('./postResource') : null;

// var post = {
//     controller: function() {
//         var ctrl = this;

//         if (!global.__server__) {

//             window.__state__ = window.__state__ || {};
//             window.__store__ = window.__store__ || {};

//             var key = m.route();

//             if (window.__store__[key]) {
//                 console.log('from store');
//                 ctrl.state = window.__state__[key];
//                 window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);

//             } else {
//                 console.log('from server', m.route.param('id'));

//                 postResource(m.route.param('id')).then(function(post) {

//                     ctrl.state = {
//                         key: key,
//                         post: post
//                     };
//                     window.__state__[key] = ctrl.state;
//                     window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);
//                 })
//             };

//             ctrl.edit = function(post) {
//                 return function(){
//                 	console.log(post);
//                 	ctrl.isEdit = true;
//                 }
//             }

//         }
//     },
//     view: function(ctrl) {
//         var post = ctrl.state.post;
//         return [
//             m.component(Navbar),
//             m('.container',
//                 m('.col-md-12',
//                     m('', [
//                         m('h1', m('a', {
//                             href: '/post/' + post.id,
//                             config: m.route
//                         }, post.title)),
//                         m("h5", [
//                             m("span", post.author.userid),
//                             " - ",
//                             m("span", post.created),
//                             m('.pull-right', [m('span.label.label-default', {
//                                 onclick: ctrl.edit(post)
//                             }, 'edit'), m('span.label.label-danger', 'delete')])
//                         ]),
//                         m('p', post.summary),
//                         m('p', post.content),
//                         // m('p', 'Written by ' + post.author.userid),
//                         m('hr')
//                     ])
//                 )
//             )
//         ]
//     }
// }

// module.exports = post;
