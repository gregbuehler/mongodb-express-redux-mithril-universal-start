var m = require('mithril');

var userForm = {

    view: function(ctrl, arg) {

        var user = arg.userCopied;

        return m('', [
            m("h2", [
                m("span", 'Author: '+user.author.userid),
                " - ",
                m("span", user.created),
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
            ]),
            m('h1', m('input', {
                style: 'width: 100%',
                value: user.title,
                onchange: function(e) {
                    user.title = e.target.value;
                }
            })),

            m('p', m('textarea', {
                style: 'width: 100%; min-height: 200px',
                onchange: function(e) {
                    user.summary = e.target.value;
                }
            }, user.summary)),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 500px',
                onchange: function(e) {
                    user.content = e.target.value;
                }
            }, user.content)),
            // m('p', 'Written by ' + user.author.userid),
            m('hr')
        ])
    }
}

module.exports = userForm;
