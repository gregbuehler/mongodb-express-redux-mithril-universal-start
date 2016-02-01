var m = require('mithril'),
    Navbar = require('../components/Navbar.js'),
    Auth = require('../utils/Auth.js'),
    userid_validation = require('../../../shared/userid_validation'),
    password_validation = require('../../../shared/password_validation');

var storage;
if (!storage) {
    try {
        storage = localStorage;
    } catch (e) {
        storage = {};
    }
}

var Login = module.exports = {
    controller: function() {
        var ctrl = this;

        this.login = function(e) {
            e.preventDefault();
            ctrl.errmsg = '';

            var userid = e.target.userid.value;
            var password = e.target.password.value;

            if (!userid_validation(userid)) {
                ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", 'Userid should be alphanumeric 4 ~ 20 length.'));
                return;
            };
            if (!password_validation(password)) {
                ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", 'Password should be any character 4 ~ 20 length.'));
                return;
            };

            //------------------------------------
            // Auth.login(e.target.userid.value, e.target.password.value)
            //     .then(function() {
            //         m.route(Auth.originalRoute || '/', null, true);
            //     }, function(err) {
            //         ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", err.errmsg));
            //     });
            //------------------------------------
            // trade credentials for a token
            m.request({
                method: 'POST',
                // url: '/auth/login',
                url: '/login',
                data: {
                    userid: userid,
                    password: password
                },
                unwrapSuccess: function(res) {
                    Auth.token = storage.token = res.token;
                    Auth.userid = storage.userid = res.userid;
                    Auth.role = storage.role = res.role;
                    m.route(Auth.originalRoute || '/', null, true);
                },
                unwrapError: function(err) {
                    ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", err.errmsg));
                    // return response.error;
                }
            })


            //-----------------------------------
            // trade credentials for a token
            // login: function(userid, password) {
            //         return m.request({
            //                 method: 'POST',
            //                 url: '/auth/login',
            //                 data: {
            //                     userid: userid,
            //                     password: password
            //                 },
            //                 unwrapSuccess: function(res) {
            //                     Auth.token = storage.token = res.token;
            //                     Auth.userid = storage.userid = res.userid;
            //                     Auth.role = storage.role = res.role;
            //                     return {
            //                         token: res.token,
            //                         userid: res.userid,
            //                         role: res.role
            //                     };
            //                 }
            //             })
            //             .then(function(data) {
            //                 // Auth.token = storage.token = token;// duplicate as above
            //                 // console.log('auth31-data', data);
            //             });
            //     },


            //====================================
        };
    },

    view: function(ctrl) {
        return [m.component(Navbar), m(".container", [
            m("form.text-center.row.form-signin", {
                    onsubmit: ctrl.login.bind(ctrl)
                },
                m('.col-sm-6.col-sm-offset-3', [
                    m("h1", "login"),
                    ctrl.errmsg,
                    m('.form-group', [
                        m("label.sr-only[for='inputUserid']", "Userid"),
                        m("input.form-control[name='userid'][autofocus][id='inputUserid'][placeholder='Userid'][required][type='string']"),
                    ]),
                    // m('.form-group', [
                    //   m("label.sr-only[for='inputEmail']", "Email address"),
                    //   m("input.form-control[name='email'][autofocus][id='inputEmail'][placeholder='Email address'][required][type='email']"),
                    // ]),
                    m('.form-group', [
                        m("label.sr-only[for='inputPassword']", "Password"),
                        m("input.form-control[name='password'][autocomplete='off'][id='inputPassword'][placeholder='Password'][required][type='password']"),
                    ]),
                    m('.form-group',
                        m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "Sign in")
                    )
                ])
            )
        ])];
    }
};
