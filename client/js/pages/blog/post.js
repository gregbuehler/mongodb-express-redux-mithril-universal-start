var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var redux = require('redux');
var postReducer = require('./postReducer');
var postsReducer = require('./postsReducer');
// var postResource = !global.__server__ ? require('./postResource') : null;
var postForm = require('./postForm');
var uuid = require('../../../../utils/uuid');
var remoteActionMiddleware = require('./remoteActionMiddleware');
var Auth = require('../../models/Auth.js');


var post = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {
            //-----------------------------
            var modelName = 'post';
            const createStoreWithMiddleware = redux.applyMiddleware(
                remoteActionMiddleware(modelName)
            )(redux.createStore);

            //=============================

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();
            var initialState;

            if (window.__state__[key]) {

                // ctrl.state = window.__state__[key];
                initialState = window.__state__[key];
                // window.__store__[key] = redux.createStore(postReducer.reducer, initialState);
                window.__store__[key] = createStoreWithMiddleware(postReducer.reducer, initialState);
                ctrl.state = window.__store__[key].getState();
                window.__state__[key] = null;

            } else if (!window.__store__[key]) {


                m.request({
                    method: 'GET',
                    url: '/api/post/' + m.route.param('id')
                }).then(function(post) {

                    initialState = {
                        key: key,
                        post: post
                    };
                    // window.__store__[key] = redux.createStore(postReducer.reducer, initialState);
                    window.__store__[key] = createStoreWithMiddleware(postReducer.reducer, initialState);
                    ctrl.state = window.__store__[key].getState();

                }, function(err) {
                    console.log('post46-err', err);
                    ctrl.err = err;
                })
            } else {
                ctrl.state = window.__store__[key].getState();
            };

            ctrl.isEdit = false;

            ctrl.edit = function() {

                if (!Auth.authorized()) {
                    return;
                };

                ctrl.isEdit = true;
                ctrl.postCopied = JSON.parse(JSON.stringify(ctrl.state.post));
            }

            ctrl.cancel = function() {
                if (!Auth.authorized()) {
                    return;
                };
                ctrl.isEdit = false;
            }

            ctrl.create = function() {

                if (!Auth.authorized()) {
                    return;
                };

                ctrl.isEdit = true;
                ctrl.post = {
                    title: 'newTitle',
                    summary: 'newSummary',
                    content: 'newContent',
                    author: {
                        userid: Auth.userid
                    }
                }
                ctrl.postCopied = JSON.parse(JSON.stringify(ctrl.post));
            }

            ctrl.save = function() {

                if (!Auth.authorized()) {
                    return;
                };

                ctrl.isEdit = false;
                var post = ctrl.postCopied;
                if (post.id) {
                    console.log('post104-update');
                    //update
                    window.__store__[key].dispatch(postReducer.updatePost(post));

                    //also remove post from the post list state
                    // TODO: this should be blog key
                    if (window.__store__['/blog']) {
                        window.__store__['/blog'].dispatch(postsReducer.updatePost(post));
                    }
                } else {
                    console.log('post113-create');
                    //create
                    post.id = uuid();
                    window.__store__[key].dispatch(postReducer.createPost(post));

                    //also remove post from the post list state
                    // TODO: this should be blog key
                    if (window.__store__['/blog']) {
                        window.__store__['/blog'].dispatch(postsReducer.createPost(post));
                    }
                }
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function() {

                if (!Auth.authorized()) {
                    return;
                };

                if (confirm('Delete this post?')) {

                    ctrl.isEdit = false;
                    var postId = ctrl.state.post.id;

                    //remove post from state
                    window.__store__[key].dispatch(postReducer.removePost(postId));

                    //also remove post from the post list state
                    // TODO: this should be blog key
                    if (window.__store__['/blog']) {
                        window.__store__['/blog'].dispatch(postsReducer.removePost(postId));
                    }
                    m.route('/blog')
                }
            }


        }


    },
    view: function(ctrl) {

        //If error, show errmsg
        if (ctrl.err) {
            return [
                m.component(Navbar),
                m('.container',
                    m('.col-md-12', m('', [
                        m('h1', m('div', ctrl.err.errmsg))
                    ]))
                )
            ];
        }
        var post = ctrl.state.post;


        return [
            m.component(Navbar),
            m('.container',
                m('.col-md-12', (!ctrl.isEdit ?
                    m('', [
                        m('h1', m('div', post.title)),
                        m("h3", [
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
                        postCopied: ctrl.postCopied,
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
