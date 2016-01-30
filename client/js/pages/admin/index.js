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

            // ctrl.isEdit = false;// not needed anymore

            ctrl.edit = function(user) {

                if (!Auth.authorized()) {
                    return;
                };
                // reset the previous user
                if (ctrl.user) {
                    ctrl.user.isEdit = false;
                }
                ctrl.isCreateUser = false;

                //assign this user to current ctrl.user
                ctrl.user = user;
                ctrl.user.isEdit = true;

                //deliver a copied user to userForm 
                ctrl.userCopied = JSON.parse(JSON.stringify(ctrl.user));
            }


            ctrl.cancel = function() {
                if (!Auth.authorized()) {
                    return;
                };

                // reset the previous user
                if (ctrl.user) {
                    ctrl.user.isEdit = false;
                }
                ctrl.isCreateUser = false;

            }

            ctrl.create = function() {

                if (!Auth.authorized()) {
                    return;
                };

                // reset the previous user
                if (ctrl.user) {
                    ctrl.user.isEdit = false;
                }

                // create new user.
                ctrl.user = {
                    userid: 'newuser',
                    password: 'newuser',
                    email: 'newuser@newuser.com',
                    verified: 'true',
                    role: 'member'
                }
                ctrl.user.isEdit = true;

                //deliver a copied user to userForm 
                ctrl.userCopied = JSON.parse(JSON.stringify(ctrl.user));

                //show this new user temporarily to the page 
                ctrl.isCreateUser = true;
            }

            ctrl.save = function() {

                if (!Auth.authorized()) {
                    return;
                };
                console.log('index117-ctrl.user', ctrl.user);

                // reset the previous user
                if (ctrl.user) {
                    ctrl.user.isEdit = false;
                }
                ctrl.isCreateUser = false;

                // save the editted ctrl.userCopied to state
                var user = ctrl.userCopied;

                //delete this temporary attribute ( isEdit )
                delete user.isEdit;

                if (user.id) {
                    console.log('index127-update');
                    //update
                    window.__store__[key].dispatch(usersReducer.updateUser(user))

                } else {
                    console.log('index132-create');
                    //create
                    user.id = uuid();
                    window.__store__[key].dispatch(usersReducer.createUser(user))

                }
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function(user) {
                console.log('index122-user', user);

                if (!Auth.authorized()) {
                    return;
                };

                if (confirm('Delete this user?')) {

                    var userId = user.id;

                    //remove user from state
                    window.__store__[key].dispatch(usersReducer.removeUser(userId))
                    console.log('index135-key', key);
                    m.route(key);
                }
            }

        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', [
                    m('h1', ['Admin', m('.pull-right',
                        m('button.btn.btn-success', {
                            onclick: ctrl.create.bind(this)
                        }, 'new'))]),

                    [m('', [
                            m("h4", [
                                m("span.col-sm-2", m('strong', 'userid')),
                                m("span.col-sm-2", m('strong', 'password')),
                                m("span.col-sm-3", m('strong', 'email')),
                                m("span.col-sm-1", m('strong', 'verified')),
                                m("span.col-sm-2", m('strong', 'role')),
                            ]),
                            m('p'),
                            m('hr', {
                                style: "width:100%"
                            })
                        ]),
                        ctrl.isCreateUser ?
                        m.component(userForm, {
                            userCopied: ctrl.userCopied,
                            save: ctrl.save,
                            remove: ctrl.remove,
                            cancel: ctrl.cancel
                        }) : null,
                        ctrl.state.users.map(function(user) {
                            return !user.isEdit ? m('', [
                                m("h4", [
                                    m("span.col-sm-2", user.userid),
                                    m("span.col-sm-2", user.password || null),
                                    m("span.col-sm-3", user.email),
                                    m("span.col-sm-1", user.verified),
                                    m("span.col-sm-2", user.role),
                                    m('.pull-right', [m('span.label.label-default', {
                                        onclick: ctrl.edit.bind(this, user)
                                    }, 'edit'), m('span.label.label-danger', {
                                        onclick: ctrl.remove.bind(this, user)
                                    }, 'delete')])
                                    // m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                                ]),
                                m('p'),
                                m('br'),
                                m('hr', {
                                    style: "width:100%;margin-top:10px"
                                })
                            ]) : m.component(userForm, {
                                userCopied: ctrl.userCopied,
                                save: ctrl.save,
                                remove: ctrl.remove,
                                cancel: ctrl.cancel
                            });
                        })
                    ]



                ])


            )
        ]
    }
};
