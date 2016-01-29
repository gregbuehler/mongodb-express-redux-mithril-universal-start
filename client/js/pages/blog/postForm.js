var m = require('mithril');

var postForm = {

    view: function(ctrl, arg) {

        var post = arg.postCopied;

        return m('', [
            m("h2", [
                m("span", post.author.userid),
                " - ",
                m("span", post.created),
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
                value: post.title,
                onchange: function(e) {
                    post.title = e.target.value;
                }
            })),

            m('p', m('textarea', {
                style: 'width: 100%; min-height: 200px',
                onchange: function(e) {
                    post.summary = e.target.value;
                }
            }, post.summary)),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 500px',
                onchange: function(e) {
                    post.content = e.target.value;
                }
            }, post.content)),
            // m('p', 'Written by ' + post.author.userid),
            m('hr')
        ])
    }
}

module.exports = postForm;
