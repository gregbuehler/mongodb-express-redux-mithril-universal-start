var m = require('mithril');
var Navbar = require('../../components/Navbar.js');
var redux = require('redux');
var reducer = require('./reducer');
var postResource = !global.__server__ ? require('./postResource') : null;

var post = {
    controller: function() {
        var ctrl = this;

        if (!global.__server__) {

            window.__state__ = window.__state__ || {};
            window.__store__ = window.__store__ || {};

            var key = m.route();

            if (window.__store__[key]) {
                console.log('from store');
                ctrl.state = window.__state__[key];
                window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);

            } else {
                console.log('from server', m.route.param('id'));

                postResource(m.route.param('id')).then(function(post) {

                    ctrl.state = {
                        key: key,
                        post: post
                    };
                    window.__state__[key] = ctrl.state;
                    window.__store__[key] = redux.createStore(reducer.reducer, window.__state__[key]);
                })
            };

        }
    },
    view: function(ctrl) {
        var post = ctrl.state.post;
        return [
            m.component(Navbar),
            m('.container',
                m('.col-md-12',
                    m('', [
                        m('h1', m('a', {
                            href: '/post/' + post.id,
                            config: m.route
                        }, post.title)),
                        m("h5", [
                            m("span", post.author.userid),
                            " - ",
                            m("span", post.created),
                            m('.pull-right', [m('span.label.label-default', 'edit'), m('span.label.label-danger', 'delete')])
                        ]),
                        m('p', post.summary),
                        m('p', post.content),
                        // m('p', 'Written by ' + post.author.userid),
                        m('hr')
                    ])
                )
            )
        ]
    }

    // view: function(ctrl) {
    //     return [
    //         m.component(Navbar),
    //         m('.container',
    //             m(".row",
    //                 m(".col-xs-12.col-sm-offset-1.col-sm-10",
    //                     m(".panel.panel-default.panel-google-plus", [
    //                         m(".panel-heading", [
    //                             m("h3", ctrl.state.post.title),
    //                             m("h5", [m("span", ctrl.state.post.author.userid), " - ", m("span", ctrl.state.post.created)])
    //                         ]),
    //                         m(".panel-body", [
    //                             m("p", ctrl.state.post.summary),
    //                             m("p", ctrl.state.post.content)

    //                         ]),
    //                         m(".panel-footer", [
    //                             m("button.btn.btn-default", "+1"),
    //                             m("button.btn.btn-default",
    //                                 m("span.glyphicon.glyphicon-share-alt")
    //                             )
    //                         ])

    //                     ])
    //                 )
    //             )

    //         )
    //     ]
    // }


}

module.exports = post;

//--------------------------------------------------
// <div class="container">
//     <div class="row">
//         <div class="[ col-xs-12 col-sm-offset-1 col-sm-5 ]">
//             <div class="[ panel panel-default ] panel-google-plus"> 
//                 <div class="panel-heading">
//                     <h3>Tytuł komunikatu</h3>
//                     <h5><span>Wysłany</span> - <span>Jun 27, 2014</span> </h5>
//                 </div>
//                 <div class="panel-body">
//                     <p>Do people born in 2000 get to choose if they are Generation Y or Generation Z? How do you decide what generation you want to belong to?</p>
//                 </div>
//                 <div class="panel-footer">
//                     <button type="button" class="[ btn btn-default ]">+1</button>
//                     <button type="button" class="[ btn btn-default ]">
//                         <span class="[ glyphicon glyphicon-share-alt ]"></span>
//                     </button>                    
//                 </div>                
//             </div>
//         </div>  
//     </div>
// </div>

// var m = require('mithril');
// console.log('post');
// var post = {
// 	controller: function(){

// 	},
// 	view: function(ctrl){
// 		return [m('div', 'post')];
// 	}
// }

// module.exports = post;
