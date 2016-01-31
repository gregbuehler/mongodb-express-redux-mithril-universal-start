var m = require('mithril'),
    Auth = require('../models/Auth.js');

var Logout = module.exports = {
    controller: function() {
        if (!global.__server__) {
            Auth.logout();
            m.route('/');
        }
    },

    view: function(ctrl) {}
};
