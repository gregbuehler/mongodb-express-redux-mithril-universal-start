var m = require('mithril'),
    formatDate = require('../../../../shared/formatDate'),
    marked = require('marked'),
    Auth = require('../../utils/Auth');

var postForm = {
    controller: function(arg) {
        var ctrl = this;

        ctrl.isPreview = false;
        ctrl.isChecked = false;


        ctrl.preview = function() {
            ctrl.isPreview = true;
        }

        ctrl.cancelPreview = function() {
            ctrl.isPreview = false;
        }

        ctrl.checkDuplicate = function() {
            ctrl.isChecked = true;
            var actionRoute = '/post/duplicate';

            var action = {
                type: 'CHECK_DUPLICATE',
                title: arg.postCopied.title,
                id: arg.postCopied.id
            }
            ctrl.msg = null;
            ctrl.errmsg = null;
            Auth.req({
                method: 'POST',
                url: '/api' + actionRoute,
                data: {
                    action: action
                },
                unwrapSuccess: function(result) {
                    // console.log('middleware21-result', result);
                    ctrl.msg = result.msg;
                },
                unwrapError: function(err) {
                    // console.log('middleware25-err', err);
                    ctrl.errmsg = err.errmsg;
                }
            });
        }

        ctrl.cancelMsg = function() {
            ctrl.isChecked = false;
            ctrl.msg = null;
            ctrl.errmsg = null;
        }
    },

    view: function(ctrl, arg) {

        var post = arg.postCopied;

        return m('', !ctrl.isPreview ? [
            m("h2", [
                m("span", 'Author: ' + post.author ? post.author.userid : null),
                " - ",
                m("span", formatDate(post.created)),
                m('.pull-right', [
                    m('span.label.label-primary', {
                        onclick: arg.save
                    }, 'save'),
                    m('span.label.label-default', {
                        onclick: arg.cancel
                    }, 'cancel'),
                    m('span.label.label-danger', {
                        onclick: arg.remove
                    }, 'delete')
                ])
            ]),
            m('h4', '*markdown can be used*'),
            m('h3', ['Title   (title should be unique)', 
                !ctrl.isChecked ? m('button.btn.btn-default', {
                    onclick: ctrl.checkDuplicate
                }, 'Check Duplicate') : m('button.btn.btn-success', {
                    onclick: ctrl.cancelMsg
                }, 'Reset'),
                m('label.label-success', ctrl.msg),
                m('label.label-warning', ctrl.errmsg),
                m('button.btn.btn-info.pull-right', {
                    onclick: ctrl.preview
                }, 'Preview')
            ]),

            m('h1', {
                id: 'title'
            }, [m('input', {
                    style: 'width: 100%',
                    value: post.title,
                    onchange: function(e) {
                        post.title = e.target.value;
                    }
                }),

            ]),
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
        ] : [
            m('h1', m('', '[ Preview ]')),
            m('h3', m('button.btn.btn-warning.pull-right', {
                onclick: ctrl.cancelPreview
            }, 'Cancel Preview')),
            m('h1', m('div', m.trust(marked(post.title)))),
            m("h3", [
                m("span", post.author ? post.author.userid : null),
                " - ",
                m("span", formatDate(post.created))
            ]),
            m('p', m.trust(marked(post.summary))),
            m('p', m.trust(marked(post.content))),
            m('hr')
        ])
    }
}

module.exports = postForm;
