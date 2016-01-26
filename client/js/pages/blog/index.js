var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var resource = !global.__server__ ? require('./resource') : null;

var blog = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {
            resource.then(function(posts) {
                ctrl.state = {};
                ctrl.state.posts = posts;
            })
        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', ctrl.state.posts.map(function(post) {
                return m('', [
                    m('h1', post.title),
                    m('p', post.summary),
                    // m('p', post.content),
                    m('p', 'Written by ' + post.author),
                    m('', [
                        m('span.badge', 'Posted ' + post.created),
                        m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                    ]),
                    m('hr')
                ]);
            })))
        ]
    }
};

