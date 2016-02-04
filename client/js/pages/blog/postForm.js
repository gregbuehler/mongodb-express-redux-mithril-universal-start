var m = require('mithril'),
    formatDate = require('../../../../shared/formatDate');

var postForm = {

    view: function(ctrl, arg) {

        var post = arg.postCopied;

        return m('', [
            m("h2", [
                m("span", 'Author: ' + post.author ? post.author.userid : null),
                " - ",
                m("span", formatDate(post.created)),
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
            m('h4', '*markdown can be used*' ),
            m('h3', 'Title   (title should be unique)'),
            m('h1',{id:'title'}, m('input', {
                style: 'width: 100%',
                value: post.title,
                onchange: function(e) {
                    post.title = e.target.value;
                }
            })),
            m('h3', 'Summary  (optional)'),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 200px',
                onchange: function(e) {
                    post.summary = e.target.value;
                }
            }, post.summary)),
            m('h3', 'Content'),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 500px',
                onchange: function(e) {
                    post.content = e.target.value;
                }
            }, post.content)),
            m('hr')
        ])
    }
}

module.exports = postForm;
