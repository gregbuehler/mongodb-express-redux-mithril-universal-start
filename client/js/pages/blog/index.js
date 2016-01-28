var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var resource = !global.__server__ ? require('./resource') : null;
var redux = require('redux');
var reducer = require('./postReducer');

var blog = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();

            if (window.__store__[key]) {

                ctrl.state = window.__state__[key];
                window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);

            } else {

                resource.then(function(posts) {
                    ctrl.state = {
                        key: key,
                        posts: posts
                    };
                    window.__state__[key] = ctrl.state;
                    window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);
                })
            };

        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', ctrl.state.posts.map(function(post) {
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
            })))
        ]
    }
};
