var m = require('mithril'),
    Navbar = require('../../components/navbar/Navbar.js'),
    Auth = require('../../utils/Auth.js');

var Profile = module.exports = {
    controller: function() {
        var ctrl = this;
        ctrl.user = {};

        if (!global.__server__) {

            window.__state__ = window.__state__ || {};
            var key = m.route();

            if (window.__state__[key]) {

                ctrl.state = window.__state__[key];

            } else {

                Auth.req('/api/profile').then(function(user) {
                    ctrl.state = {
                        key: key,
                        user: user
                    };
                    window.__state__[key] = ctrl.state;
                });
            }
        }
    },

    view: function(ctrl) {
        return [m.component(Navbar), m('.container', [
            m('h1', 'profile'),
            m('p', 'this is a demo of locking things down on client & server. This is you:'),
            m('pre.json', JSON.stringify(ctrl.state.user, null, 2))
        ])];
    }
};
