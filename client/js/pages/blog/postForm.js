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
        
    },

    view: function(ctrl, arg) {

        var post = ctrl.post;
        
        return m('', [
            m('h1', m('input', {
                style: 'width: 100%',
                value: post.title,
                onchange: function(e) {
                    post.title = e.target.value;
                    console.log('postForm16-post.title', post.title);
                }
            })),
            m("h5", [
                m("span", post.author.userid),
                " - ",
                m("span", post.created + post.title),
                m('.pull-right', [
                    m('span.label.label-default', {
                        onclick: ctrl.save.bind(this, post)
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
//---------------------------------------------
// var m = require('mithril');
// var redux = require('redux');
// var reducer = require('./postReducer');


// var postForm = {
//     controller: function(arg) {},
//     view: function(ctrl, arg) {
//         var post = arg.post;
//         return m('form', [
//             m('h1', m('input', {
//                 style: 'width: 100%',
//                 value: post.title,
//                 onchange: function(e){
//                     post.title = e.target.value;
//                     console.log('postForm16-post.title', post.title);
//                 }
//             })),
//             m("h5", [
//                 m("span", post.author.userid),
//                 " - ",
//                 m("span", post.created),
//                 m('.pull-right', [
//                     m('input.label.label-default', {
//                         type:'submit',
//                         onsubmit: function(e){e.preventDefault(); arg.save(post)}
//                     }, 'save'),
//                     m('span.label.label-default', {
//                         onclick: arg.cancel()
//                     }, 'cancel'),
//                     m('span.label.label-danger', {
//                         onclick: arg.remove()
//                     }, 'delete')
//                 ])
//             ]),
//             m('p', m('textarea', {
//                 style: 'width: 100%; min-height: 200px'
//             }, post.summary)),
//             m('p', m('textarea', {
//                 style: 'width: 100%; min-height: 500px'
//             }, post.content)),
//             // m('p', 'Written by ' + post.author.userid),
//             m('hr')
//         ])
//     }
// }

// module.exports = postForm;
//----------------------------------------------

// var m = require('mithril');
// var redux = require('redux');
// var reducer = require('./postReducer');


// var postForm = {
//     controller: function(arg) {},
//     view: function(ctrl, arg) {
//         var post = arg.post;
//         return m('', [
//             m('h1', m('input', {
//                 style: 'width: 100%',
//                 value: post.title,
//                 onchange: function(e){
//                     post.title = e.target.value;
//                     console.log('postForm16-post.title', post.title);
//                 }
//             })),
//             m("h5", [
//                 m("span", post.author.userid),
//                 " - ",
//                 m("span", post.created),
//                 m('.pull-right', [
//                     m('span.label.label-default', {
//                         onclick: arg.save(post)
//                     }, 'save'),
//                     m('span.label.label-default', {
//                         onclick: arg.cancel()
//                     }, 'cancel'),
//                     m('span.label.label-danger', {
//                         onclick: arg.remove()
//                     }, 'delete')
//                 ])
//             ]),
//             m('p', m('textarea', {
//                 style: 'width: 100%; min-height: 200px'
//             }, post.summary)),
//             m('p', m('textarea', {
//                 style: 'width: 100%; min-height: 500px'
//             }, post.content)),
//             // m('p', 'Written by ' + post.author.userid),
//             m('hr')
//         ])
//     }
// }

// module.exports = postForm;
