var m = require('mithril');
var redux = require('redux');
var reducer = require('./postReducer');


var postForm = {
    controller: function(arg) {},
    view: function(ctrl, arg) {
        var post = arg.post;
        return m('', [
            m('h1', m('input', {
                style: 'width: 100%',
                value: post.title
            })),
            m("h5", [
                m("span", post.author.userid),
                " - ",
                m("span", post.created),
                m('.pull-right', [
                    m('span.label.label-default', {
                        onclick: arg.save()
                    }, 'save'),
                    m('span.label.label-default', {
                        onclick: arg.cancel()
                    }, 'cancel'),
                    m('span.label.label-danger', {
                        onclick: arg.remove()
                    }, 'delete')
                ])
            ]),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 200px'
            }, post.summary)),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 500px'
            }, post.content)),
            // m('p', 'Written by ' + post.author.userid),
            m('hr')
        ])
    }
}

module.exports = postForm;
