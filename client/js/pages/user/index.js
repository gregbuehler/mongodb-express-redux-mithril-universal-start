var m = require('mithril'),
    Navbar = require('../../components/Navbar.js'),
    redux = require('redux'),
    usersReducer = require('./usersReducer'),
    uuid = require('../../../../shared/uuid'),
    userForm = require('./userForm'),
    remoteActionMiddleware = require('../../utils/remoteActionMiddleware'),
    Auth = require('../../utils/Auth.js');


var users = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            var modelName = 'user';
            const createStoreWithMiddleware = redux.applyMiddleware(
                remoteActionMiddleware(modelName)
            )(redux.createStore);

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();
            var initialState;

            if (window.__state__[key]) {

                initialState = window.__state__[key];

                window.__store__[key] = createStoreWithMiddleware(usersReducer.reducer, initialState);

                ctrl.state = window.__store__[key].getState();

                window.__state__[key] = null;

            } else if (!window.__store__[key]) {

                Auth.req({
                    method: 'GET',
                    // url: '/api/user'
                    url: '/user/api'
                }).then(function(users) {

                    initialState = {
                        key: key,
                        users: users
                    };

                    window.__store__[key] = createStoreWithMiddleware(usersReducer.reducer, initialState);

                    ctrl.state = window.__store__[key].getState();

                })
            } else {
                ctrl.state = window.__store__[key].getState();
            };

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

                    //update
                    window.__store__[key].dispatch(usersReducer.updateUser(user))

                } else {

                    //create
                    user.id = uuid();
                    window.__store__[key].dispatch(usersReducer.createUser(user))

                }
                ctrl.state = window.__store__[key].getState();
            }

            ctrl.remove = function(user) {

                if (!Auth.authorized()) {
                    return;
                };

                if (confirm('Delete this user?')) {

                    var userId = user.id;

                    //remove user from state
                    window.__store__[key].dispatch(usersReducer.removeUser(userId))
                    m.route(key);
                }
            }

        } else {
            //Server-side empty function definition
            //If this is not defined, page-pending occurs on server-side.
            ctrl.edit = function() {};
            ctrl.create = function() {};
            ctrl.save = function() {};
            ctrl.remove = function() {};
            ctrl.cancel = function() {};
        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', [
                m('h1', ['User', m('.pull-right', !(ctrl.isCreateUser) ?
                    m('button.btn.btn-success', {
                        onclick: ctrl.create.bind(this)
                    }, 'new') : m('button.btn.btn-default', {
                        onclick: ctrl.cancel.bind(this)
                    }, 'cancel'))]),

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
            ]))
        ]
    }
};
