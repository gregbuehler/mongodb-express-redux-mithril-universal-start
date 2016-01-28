var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var redux = require('redux');
var postReducer = require('./postReducer');
var postsReducer = require('./postsReducer');
var postResource = !global.__server__ ? require('./postResource') : null;
var postForm = require('./postForm');

var post = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();
            var initialState;

            if (window.__state__[key]) {

                console.log('from window');
                // ctrl.state = window.__state__[key];
                initialState = window.__state__[key];
                window.__store__[key] = redux.createStore(postReducer.reducer, initialState);
                ctrl.state = window.__store__[key].getState();
                window.__state__[key] = null;

            } else if (!window.__store__[key]) {

                console.log('from server', m.route.param('id'));

                postResource(m.route.param('id')).then(function(post) {

                    initialState = {
                        key: key,
                        post: post
                    };
                    window.__store__[key] = redux.createStore(postReducer.reducer, initialState);
                    ctrl.state = window.__store__[key].getState();

                })
            } else {
                ctrl.state = window.__store__[key].getState();
            };

            ctrl.isEdit = false;

            ctrl.edit = function() {
                ctrl.isEdit = true;
            }

            ctrl.cancel = function() {
                ctrl.isEdit = false;
            }

            ctrl.create = function() {
                ctrl.isEdit = true;
                // initialState = {
                //     key: 'newPost',
                //     post: {
                //         title: '',
                //         summary: '',
                //         content: '',
                //         created: Date.now(),
                //         author: {
                //             userid: 'tempAuthor'
                //         }
                //     }
                // }
                // window.__store__[initialState.key] = redux.createStore(postReducer.reducer, initialState);
                window.__store__[key].dispatch(postReducer.createPost())

                ctrl.state = window.__store__[key].getState();
            }

            ctrl.save = function(post) {
                ctrl.isEdit = false;
                window.__store__[key].dispatch(postReducer.updatePost(post))
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function() {
                if (confirm('Delete this post?')) {

                    ctrl.isEdit = false;
                    var postId = ctrl.state.post.id;

                    //remove post from state
                    window.__store__[key].dispatch(postReducer.removePost(postId))

                    //also remove post from the post list state
                    // TODO: after remove, m.route('/blog') is not working.
                    // if (window.__store__['/blog']) {
                    //     window.__store__['/blog'].dispatch(postsReducer.removePost(postId))
                    // }
                    m.route('/blog')
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
                                onclick: ctrl.edit.bind(this)
                            }, 'edit'), m('span.label.label-danger', {
                                onclick: ctrl.remove.bind(this)
                            }, 'delete'), m('span.label.label-success', {
                                onclick: ctrl.create.bind(this)
                            }, 'new')])
                        ]),
                        m('p', post.summary),
                        m('p', post.content),
                        // m('p', 'Written by ' + post.author.userid),
                        m('hr')
                    ]) :
                    m.component(postForm, {
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
// var postReducer = require('./reducer');
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
//                 window.__store__[key] = redux.createStore(postReducer.reducer, window.__state__[key]);

//             } else {
//                 console.log('from server', m.route.param('id'));

//                 postResource(m.route.param('id')).then(function(post) {

//                     ctrl.state = {
//                         key: key,
//                         post: post
//                     };
//                     window.__state__[key] = ctrl.state;
//                     window.__store__[key] = redux.createStore(postReducer.reducer, window.__state__[key]);
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
