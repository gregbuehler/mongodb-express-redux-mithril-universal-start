var m = require('mithril');

var userForm = {

    view: function(ctrl, arg) {

        var user = arg.userCopied;

        return m('',

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
                //ctrl.state.users.map(function(user) {//
                m('', [
                    m("h4", [
                        m("input.col-sm-4", {
                            value: user.userid,
                            onchange: function(e) {
                                user.userid = e.target.value
                            }
                        }, user.userid),
                        m("input.col-sm-4", {
                            value: user.userid,
                            onchange: function(e) {
                                user.userid = e.target.value
                            }
                        }, user.email),
                        m("input.col-sm-1", {
                            value: user.userid,
                            onchange: function(e) {
                                user.userid = e.target.value
                            }
                        }, user.verified),
                        m("input.col-sm-1", {
                            value: user.userid,
                            onchange: function(e) {
                                user.userid = e.target.value
                            }
                        }, user.role),
                        m('.pull-right', [
                            m('span.label.label-default', {
                                onclick: arg.save.bind(this)
                            }, 'save'),
                            m('span.label.label-default', {
                                onclick: arg.cancel.bind(this)
                            }, 'cancel'),
                            m('span.label.label-danger', {
                                onclick: arg.remove.bind(this)
                            }, 'delete')
                        ])
                        // m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                    ]),
                    m('p'),
                    m('hr', {
                        style: "width:100%"
                    })
                ])
                //})//
            ]

        )
    }
}

module.exports = userForm;
