var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
// var resource = !global.__server__ ? require('./resource') : require('../../../../server/pages/blog/resource');
var resource = !global.__server__ ? require('./resource') : null;

var blog = module.exports = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {
            resource.then(function(posts) {
                ctrl.state = {};
                ctrl.state.posts = posts;
                console.log(posts);
            })

        }

    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', ctrl.state.posts.map(function(post) {
                return m('', [
                    m('h1', post.title),
                    m('p', post.summary),
                    // m('p', post.content),
                    m('p', 'Written by ' + post.author),
                    m('', [
                        m('span.badge', 'Posted ' + post.created),
                        m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                    ]),
                    m('hr')
                ]);
            })))
        ]
    }
};

//------------------------------------------

// var m = require('mithril');
// var Navbar = require('../../components/Navbar.js');
// var Auth = require('../../models/Auth.js');
// var mockaroo = require('../../../../site/mockPost');

// var blog = module.exports = {
//     controller: function() {
//         var ctrl = this;

//         // mock author id = 56a6ca884d6f6360c5900100;
//         mockaroo.forEach(function(post) {
//             post.author = 'Author';
//         })

//         ctrl.state = {};
//         ctrl.state.posts = mockaroo;
//     },

//     view: function(ctrl) {
//         return [
//             m.component(Navbar),
//             m('.container', m('.col-md-12', ctrl.state.posts.map(function(post) {
//                 return m('', [
//                     m('h1', post.title),
//                     m('p', post.summary),
//                     // m('p', post.content),
//                     m('p', 'Written by ' + post.author),
//                     m('', [
//                         m('span.badge', 'Posted ' + post.created),
//                         m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
//                     ]),
//                     m('hr')
//                 ]);
//             })))
//         ]
//     }
// };
