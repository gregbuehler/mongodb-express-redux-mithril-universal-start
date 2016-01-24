var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var Auth = require('../../models/Auth.js');

var blog = module.exports = {
    controller: function() {
        var ctrl = this;
        ctrl.state = {};
        ctrl.state.posts = [{
            name: 'post1 title',
            summary: 'this is summary of post1',
            created: '26/11/2015'
        }, {
            name: 'post2 title',
            summary: 'this is summary of post2',
            created: '26/11/2015'

        }, {
            name: 'post3 title',
            summary: 'this is summary of post3',
            created: '26/11/2015'

        }, {
            name: 'post4 title',
            summary: 'this is summary of post4',
            created: '26/11/2015'

        }, {
            name: 'post5 title',
            summary: 'this is summary of post5',
            created: '26/11/2015'

        }];


    },

    view: function(ctrl) {
        return [
            m.component(Navbar),
            m('.container', m('.col-md-12', ctrl.state.posts.map(function(post) {
                return m('', [
                    m('h1', post.name),
                    m('p', post.summary),
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
//----------------------------------------------
// var m = require('mithril');
// var Navbar = require('../../components/Navbar.js');
// var Auth = require('../../models/Auth.js');

// var blog = module.exports = {
//     controller: function() {
//         var ctrl = this;
//         ctrl.posts = '';

//         if (!global.__server__) {

//             Auth.req('/api/profile').then(function(user) {
//                 ctrl.user = user;
//             });

//         }
//     },

//     view: function(ctrl) {
//         return [m.component(Navbar), m('.container', [
//             m('h1', 'blog'),
//             m('p', 'this is a demo of locking things down on client & server. This is you:'),
//             m('pre.json', JSON.stringify(ctrl.posts, null, 2))
//         ])];
//     }
// };
