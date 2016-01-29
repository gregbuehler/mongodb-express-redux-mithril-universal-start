var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var postsResource = !global.__server__ ? require('./postsResource') : null;
var redux = require('redux');
var postsReducer = require('./postsReducer');
var uuid = require('../../../../utils/uuid');
var postForm = require('./postForm');


var blog = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();
            var initialState;

            if (window.__state__[key]) {

                initialState = window.__state__[key];
                window.__store__[key] = redux.createStore(postsReducer.reducer, initialState);
                ctrl.state = window.__store__[key].getState();
                window.__state__[key] = null;

            } else if (!window.__store__[key]) {

                postsResource.then(function(posts) {

                    initialState = {
                        key: key,
                        posts: posts
                    };
                    window.__store__[key] = redux.createStore(postsReducer.reducer, initialState);
                    ctrl.state = window.__store__[key].getState();

                })
            } else {
                ctrl.state = window.__store__[key].getState();
            };

            ctrl.isEdit = false;

            ctrl.cancel = function() {
                ctrl.isEdit = false;
            }

            ctrl.create = function() {
                ctrl.isEdit = true;
                ctrl.post = {
                    title: 'newTitle',
                    summary: 'newSummary',
                    content: 'newContent',
                    created: 'newDate',
                    author: {
                        userid: 'new_Author'
                    }
                }
                ctrl.postCopied = JSON.parse(JSON.stringify(ctrl.post));
            }

            ctrl.save = function() {
                ctrl.isEdit = false;
                var post = ctrl.postCopied;
                if (post.id) {
                    console.log('index67-update');
                    //update
                    window.__store__[key].dispatch(postsReducer.updatePost(post))

                } else {
                    console.log('index70-create');
                    //create
                    post.id = uuid();
                    window.__store__[key].dispatch(postsReducer.createPost(post))

                }
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function() {
                if (confirm('Delete this post?')) {

                    ctrl.isEdit = false;
                    var postId = ctrl.postCopied.id;

                    //remove post from state
                    window.__store__[key].dispatch(postsReducer.removePost(postId))

                    // TODO: go to previous page
                    // m.route('/blog')
                    m.route(key);
                }
            }

        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', [
                    m('h1', ['Blog', m('.pull-right', !ctrl.isEdit ?
                        m('button.btn.btn-success', {
                            onclick: ctrl.create.bind(this)
                        }, 'new') : null)
                    ]),

                    !ctrl.isEdit ?
                    ctrl.state.posts.map(function(post) {
                        return m('', [

                            m('h1', m('a', {
                                href: '/post/' + post.id,
                                config: m.route
                            }, post.title)),
                            m('p', post.summary),
                            // m('p', post.content),
                            // m('p', 'Written by ' + post.author.userid),
                            // m('', [
                            //     m('span.badge', 'Posted ' + post.created),
                            //     m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                            // ]),
                            m("h5", [
                                m("span", post.author.userid),
                                " - ",
                                m("span", post.created),
                                // m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                            ]),
                            m('hr')
                        ]);
                    })

                    : m.component(postForm, {
                        postCopied: ctrl.postCopied,
                        save: ctrl.save,
                        remove: ctrl.remove,
                        cancel: ctrl.cancel
                    })

                ])


            )
        ]
    }
};
