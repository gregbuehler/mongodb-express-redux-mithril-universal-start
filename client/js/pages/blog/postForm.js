var m = require('mithril');
var redux = require('redux');
var reducer = require('./postReducer');



var postForm = {
    controller: function(arg) {
        var ctrl = this;

        ctrl.post = JSON.parse(JSON.stringify(arg.post));

        ctrl.save = function(post) {
            arg.post = post;
            arg.save(arg.post);
        }

        ctrl.cancel = function() {
            //Reset to original state
            ctrl.post = JSON.parse(JSON.stringify(arg.post));
            arg.cancel();
        }
        
    },

    view: function(ctrl, arg) {

        var post = ctrl.post;
        
        return m('', [
            m('h1', m('input', {
                style: 'width: 100%',
                value: post.title,
                onchange: function(e) {
                    post.title = e.target.value;
                }
            })),
            m("h5", [
                m("span", post.author.userid),
                " - ",
                m("span", post.created),
                m('.pull-right', [
                    m('span.label.label-default', {
                        onclick: ctrl.save.bind(this, post)
                    }, 'save'),
                    m('span.label.label-default', {
                        onclick: ctrl.cancel.bind(this)
                    }, 'cancel'),
                    m('span.label.label-danger', {
                        onclick: arg.remove.bind(this)
                    }, 'delete')
                ])
            ]),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 200px',
                onchange: function(e){
                    post.summary = e.target.value;
                }
            }, post.summary)),
            m('p', m('textarea', {
                style: 'width: 100%; min-height: 500px',
                onchange: function(e){
                    post.content = e.target.value;
                }
            }, post.content)),
            // m('p', 'Written by ' + post.author.userid),
            m('hr')
        ])
    }
}

module.exports = postForm;

