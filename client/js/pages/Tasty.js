var m = require('mithril');
var Navbar = require('../components/Navbar.js');
// var Auth = global.__server__ ? require('../../../server/resources/Auth.js') : require('../models/Auth.js');
var Auth = require('../models/Auth.js');

var Tasty = module.exports = {
    controller: function() {
        var ctrl = this;
        ctrl.navbar = new Navbar.controller();
        ctrl.user = '';

        if (!global.__server__) {

            Auth.req('/api/tasty').then(function(user) {
                ctrl.user = user; ;
            });

        }
    },

    view: function(ctrl) {
        return [Navbar.view(ctrl.navbar), m('.container', [
            m('h1', 'tasty'),
            m('p', 'this is a demo of locking things down on client & server. This is you:'),
            m('pre.json', JSON.stringify(ctrl.user, null, 2))
        ])];
    }
};
