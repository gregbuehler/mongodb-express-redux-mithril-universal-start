var m = require('mithril'),
    Navbar = require('../../components/navbar/Navbar.js'),
    Auth = require('../../utils/Auth.js'),
    userid_validation = require('../../../../shared/userid_validation'),
    email_validation = require('../../../../shared/email_validation'),
    password_validation = require('../../../../shared/password_validation'),
    uuid = require('../../../../shared/uuid'),
    config = require('../../../../site/config');

var Register = module.exports = {
    controller: function() {
        ctrl = this;

        ctrl.register = function(e) {
            e.preventDefault();
            ctrl.msg = '';
            ctrl.errmsg = '';
            var userid = e.target.userid.value;
            var email = e.target.email.value;
            var password = e.target.password.value;
            var password2 = e.target.password2.value;

            if (!userid_validation(userid)) {
                ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", 'Userid should be alphanumeric 4 ~ 20 length.'));
                return;
            };
            if (!email_validation(email)) {
                ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", 'Email is not valid.'));
                return;
            };
            if (!password_validation(password)) {
                ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", 'Password should be any character 4 ~ 20 length.'));
                return;
            };
            if (password !== password2) {
                ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", 'Passwords must match.'));
                return;
            }

            // Auth.register(e.target.userid.value, e.target.email.value, e.target.password.value, e.target.password2.value)
            //     .then(function() {
            //         ctrl.msg = (m(".alert.alert-success.animated.fadeInUp", 'Cool. Go check your email (or the console) for your verify link.'));
            //     }, function(err) {
            //         var errmsg = err.errmsg;

            //         if (errmsg.indexOf(e.target.userid.value) > -1) {
            //             errmsg = 'There is already a user with that userid.';
            //         } else if (errmsg.indexOf(e.target.email.value) > -1) {
            //             errmsg = 'There is already a user with that email address.';
            //         }

            //         ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", errmsg));
            //     });

            m.request({
                method: 'POST',
                url: '/api/register',
                data: {
                    id: uuid(),
                    userid: userid,
                    email: email,
                    password: password,
                    password2: password2
                },
                unwrapSuccess: function(res) {
                    ctrl.msg = (m(".alert.alert-success.animated.fadeInUp", 'Cool. Go check your email (or the console) for your verify link.'));
                },
                unwrapError: function(err) {
                    var errmsg = err.errmsg;

                    if (errmsg.indexOf(e.target.userid.value) > -1) {
                        errmsg = 'There is already a user with that userid.';
                    } else if (errmsg.indexOf(e.target.email.value) > -1) {
                        errmsg = 'There is already a user with that email address.';
                    }

                    ctrl.errmsg = (m(".alert.alert-danger.animated.fadeInUp", errmsg));
                }
            });
        };
    },

    view: function(ctrl) {
        return [m.component(Navbar), m(".container", [
            m("form.text-center.row.form-signin", {
                    onsubmit: ctrl.register.bind(ctrl)
                },
                m('.col-sm-6.col-sm-offset-3', [
                    m("h1", "register"),
                    ctrl.errmsg,
                    ctrl.msg ?
                    ctrl.msg :
                    m('', [
                        m('.form-group', [
                            m("label.sr-only[for='inputUserid']", "Userid"),
                            m("input.form-control[name='userid'][autofocus][id='inputUserid'][placeholder='Userid'][required][type='string']"),
                        ]),
                        m('.form-group', [
                            m("label.sr-only[for='inputEmail']", "Email address"),
                            m("input.form-control[name='email'][id='inputEmail'][placeholder='Email address'][required][type='email']"),
                        ]),
                        m('.form-group', [
                            m("label.sr-only[for='inputPassword']", "Password"),
                            m("input.form-control[name='password'][autocomplete='off'][id='inputPassword'][placeholder='Password'][required][type='password']"),
                        ]),
                        m('.form-group', [
                            m("label.sr-only[for='inputPassword2']", "Password (again)"),
                            m("input.form-control[name='password2'][autocomplete='off'][id='inputPassword2'][placeholder='Password (again)'][required][type='password']"),
                        ]),
                        m('.form-group',
                            m("button.btn.btn-lg.btn-primary.btn-block[type='submit']", "Sign in")
                        )
                    ])

                ])
            )
        ])];
    }
};
