var m = require('mithril'),
    config = require('../../../../site/config'),
    Navbar = require('../../components/navbar/Navbar'),
    Paginator = require('../../components/paginator/Paginator'),
    redux = require('redux'),
    postsReducer = require('./postsReducer'),
    uuid = require('../../../../shared/uuid'),
    postForm = require('./postForm'),
    remoteActionMiddleware = require('../../utils/remoteActionMiddleware'),
    Auth = require('../../utils/Auth.js'),
    formatDate = require('../../../../shared/formatDate'),
    marked = require('marked');

var blog = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            var actionRoute = '/post';
            const createStoreWithMiddleware = redux.applyMiddleware(
                remoteActionMiddleware(actionRoute)
            )(redux.createStore);

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();
            var initialState;

            if (window.__state__[key]) {

                initialState = window.__state__[key];

                window.__store__[key] = createStoreWithMiddleware(postsReducer.reducer, initialState);

                ctrl.state = window.__store__[key].getState();

                window.__state__[key] = null;

            } else if (!window.__store__[key]) {

                m.request({
                    method: 'GET',
                    url: '/api' + key
                }).then(function(result) {

                    initialState = result;

                    window.__store__[key] = createStoreWithMiddleware(postsReducer.reducer, initialState);

                    ctrl.state = window.__store__[key].getState();

                })
            } else {
                ctrl.state = window.__store__[key].getState();
            };

            ctrl.isEdit = false;


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

                    //update
                    window.__store__[key].dispatch(postsReducer.updatePost(post));

                } else {

                    //create
                    // post.id = uuid();
                    post.id = post.title.replace(/\s/g,'_');
                    post.created = new Date();

                    window.__store__[key].dispatch(postsReducer.createPost(post));

                }
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function() {

                if (!Auth.authorized()) {
                    return;
                };

                if (confirm('Delete this post?')) {

                    ctrl.isEdit = false;
                    var postId = ctrl.postCopied.id;

                    //remove post from state
                    window.__store__[key].dispatch(postsReducer.removePost(postId))

                    m.route(key);
                }
            }

        } else {
            //Server-side empty functions.
            //If this is not defined, pending occurs on server-side.
            ctrl.create = function() {};
            ctrl.save = function() {};
            ctrl.remove = function() {};
            ctrl.cancel = function() {};
        }

    },

    view: function(ctrl) {
        return m('', [
            m.component(Navbar),
            m('.container', m('.col-md-12', [
                    m('h1', ['Blog', m('.pull-right', !ctrl.isEdit ?
                        m('button.btn.btn-success', {
                            onclick: ctrl.create.bind(this)
                        }, 'new') : null)]), !ctrl.isEdit ? [
                        ctrl.state.posts.map(function(post) {
                            return m('', [

                                m('h1', m('a', {
                                    href: '/post/' + post.id,
                                    config: m.route
                                }, m.trust(marked(post.title)))),
                                m('p', m.trust(marked(post.summary))),
                                m("h5", [
                                    m("span", post.author ? post.author.userid : 'unknown'),
                                    " - ",
                                    m("span", formatDate(post.created)),
                                ]),
                                m('hr')
                            ]);
                        }),
                        m.component(Paginator, {
                            count: ctrl.state.count,
                            perPage: config.blogPerPage,
                            page: ctrl.state.page,
                            baseRoute: ctrl.state.baseRoute
                        })
                    ]

                    : m.component(postForm, {
                        postCopied: ctrl.postCopied,
                        save: ctrl.save,
                        remove: ctrl.remove,
                        cancel: ctrl.cancel
                    })

                ])


            )
        ])
    }
};
