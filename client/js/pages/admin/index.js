var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var usersResource = !global.__server__ ? require('./usersResource') : null;
var redux = require('redux');
var usersReducer = require('./usersReducer');
var uuid = require('../../../../utils/uuid');
var userForm = require('./userForm');
var remoteActionMiddleware = require('./remoteActionMiddleware');
var Auth = require('../../models/Auth.js');


var admin = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {
            //-----------------------------
            var modelName = 'user';
            const createStoreWithMiddleware = redux.applyMiddleware(
                remoteActionMiddleware(modelName)
            )(redux.createStore);

            //=============================
            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();
            var initialState;

            if (window.__state__[key]) {

                initialState = window.__state__[key];
                // window.__store__[key] = redux.createStore(usersReducer.reducer, initialState);
                window.__store__[key] = createStoreWithMiddleware(usersReducer.reducer, initialState);
                ctrl.state = window.__store__[key].getState();
                window.__state__[key] = null;

            } else if (!window.__store__[key]) {

                usersResource.then(function(users) {

                    initialState = {
                        key: key,
                        users: users
                    };
                    // window.__store__[key] = redux.createStore(usersReducer.reducer, initialState);
                    window.__store__[key] = createStoreWithMiddleware(usersReducer.reducer, initialState);
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
                ctrl.user = {
                    title: 'newTitle',
                    summary: 'newSummary',
                    content: 'newContent',
                    author: {
                        userid: Auth.userid
                    }
                }
                ctrl.userCopied = JSON.parse(JSON.stringify(ctrl.user));
            }

            ctrl.save = function() {

                if (!Auth.authorized()) {
                    return;
                };

                ctrl.isEdit = false;
                var user = ctrl.userCopied;
                if (user.id) {
                    console.log('index67-update');
                    //update
                    window.__store__[key].dispatch(usersReducer.updateUser(user))

                } else {
                    console.log('index70-create');
                    //create
                    user.id = uuid();
                    window.__store__[key].dispatch(usersReducer.createUser(user))

                }
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function() {

                if (!Auth.authorized()) {
                    return;
                };

                if (confirm('Delete this user?')) {

                    ctrl.isEdit = false;
                    var userId = ctrl.userCopied.userid;

                    //remove user from state
                    window.__store__[key].dispatch(usersReducer.removeUser(userId))

                    m.route(key);
                }
            }

        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', [
                    m('h1', ['Admin', m('.pull-right', !ctrl.isEdit ?
                        m('button.btn.btn-success', {
                            onclick: ctrl.create.bind(this)
                        }, 'new') : null)]),

                    !ctrl.isEdit ?
                    [m('', [
                        m("h4", [
                            m("span.col-sm-4", m('strong', 'userid')),
                            m("span.col-sm-4", m('strong', 'email')),
                            m("span.col-sm-1", m('strong', 'verified')),
                            m("span.col-sm-1", m('strong', 'role')),
                        ]),
                        m('p'),
                        m('hr', {
                            style: "width:100%"
                        })
                    ]),
                    ctrl.state.users.map(function(user) {
                        return m('', [
                            m("h4", [
                                m("span.col-sm-4", user.userid),
                                m("span.col-sm-4", user.email),
                                m("span.col-sm-1", user.verified),
                                m("span.col-sm-1", user.role),

                                m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                            ]),
                            m('p'),
                            m('hr', {
                                style: "width:100%"
                            })
                        ]);
                    })]

                    : m.component(userForm, {
                        userCopied: ctrl.userCopied,
                        save: ctrl.save,
                        remove: ctrl.remove,
                        cancel: ctrl.cancel
                    })

                ])


            )
        ]
    }
};
