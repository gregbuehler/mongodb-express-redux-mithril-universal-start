var m = require('mithril');
var mpaginate = require('../../../shared/mithril.paginate');

// Mock some data
var items = [];
for (var i = 0; i < 105; i++) {
    items.push({
        'name': 'Item #' + i
    })
}

/**
 * Your Module
 */

var app = {},
    options = {
        perPage: 5,
        data: items
    };
/* Controller */
app.controller = function() {
        this.paginate = new mpaginate.controller(options)

    }
    /* View */
app.view = function(ctrl) {
    return m('', [
        mpaginate.view(ctrl.paginate)
    ]);
}
module.exports = app;

//-------------------------------
// // Mock some data
// var items = [];
// for (var i = 0; i < 105; i++) {
//     items.push({
//         'name': 'Item #' + i
//     })
// }

// /**
//  * Your Module
//  */

// var app = {},
//     options = {
//         perPage: 5,
//         data: items
//     };
// /* Controller */
// app.controller = function() {
//         this.paginate = new mpaginate.controller(options)

//     }
//     /* View */
// app.view = function(ctrl) {
//     return [
//         mpaginate.view(ctrl.paginate)
//     ]
// }

// /* Initialize the app */
// m.module(document.getElementById('paginate'), app)

//------------------------------------
// var m = require('mithril');

// // Mock some data
// var items = [];
// for (var i = 0; i < 105; i++) {
//     items.push({
//         'name': 'Item #' + i
//     })
// }
// /* Module */

// var app = {};
// var defaultOptions = {
//     perPage: 10,
//     page: 1,
//     limit: 10,
//     ellipsis: '&hellip;',
//     edges: 2,
//     data: items
// }

// /**
//  * Extend
//  */
// var extend = function(obj, extObj) {
//     if (arguments.length > 2) {
//         for (var a = 1; a < arguments.length; a++) {
//             extend(obj, arguments[a]);
//         }
//     } else {
//         for (var i in extObj) {
//             obj[i] = extObj[i];
//         }
//     }
//     return obj;
// };

// /**
//  * Controller
//  * @return {[type]} [description]
//  */
// app.controller = function(options) {


//     /* Extend options */

//     this.options = extend(defaultOptions, options);

//     this.perPage = m.prop(this.options.perPage)

//     this.page = m.prop(this.options.page - 1);


//     /* Items */

//     this.items = m.prop(this.options.data || []);

//     /* Total pages */

//     this.totalPages = m.prop(Math.ceil(this.items().length / this.perPage()))


//     /**
//      * Page list
//      */

//     this.pageList = function() {

//         var p = [],
//             start = 0,
//             end = this.totalPages(),
//             left = Math.max(parseInt(this.page()) - this.options.edges, 0),
//             right = Math.min(parseInt(this.page()) + this.options.edges, this.totalPages())

//         for (var i = start; i < end; i++) {

//             if (i == 0 || i == parseInt(this.totalPages()) - 1 || this.totalPages() < this.options.limit) {

//                 p.push(i)

//             } else {

//                 if (i == (right + 1) || i == (left - 1)) p.push(this.options.ellipsis)

//                 if (i <= right && i >= left) p.push(i)
//             }
//         }

//         return p;

//     }.bind(this)



//     /**
//      * Next page
//      */

//     this.nextPage = function() {

//         var current = this.page();

//         ++current;

//         if (current > (this.totalPages() - 1)) {
//             current = (this.totalPages() - 1);
//         }

//         this.page(current)

//     }.bind(this)

//     *
//      * Prev page


//     this.prevPage = function() {

//         var current = this.page();

//         --current;

//         if (current < 0) {
//             current = 0;
//         }

//         this.page(current)


//     }.bind(this)


//     /**
//      * Change perPage
//      */

//     this.changePerPage = function(value) {

//         this.perPage(value)

//         /* Recalculate total pages */

//         this.totalPages(Math.ceil(this.items().length / this.perPage()))

//         /* Jump to page 1 */

//         this.page(0);

//     }.bind(this)
// }

// /**
//  * View
//  * @return {[type]} [description]
//  */
// app.view = function(ctrl) {
//     return m('', [
//         m('ul.items', [
//             ctrl.items()
//             .slice(ctrl.page() * ctrl.perPage(), (parseInt(ctrl.page()) + 1) * ctrl.perPage())
//             .map(function(item) {
//                 return m('li', item.name)
//             })
//         ]),

//         m('nav.pages', [
//             m('a', {
//                 onclick: ctrl.prevPage,
//                 class: ctrl.page() == 0 ? 'disabled' : ''
//             }, 'Previous page'),
//             ctrl.pageList().map(function(page) {

//                 switch (page) {

//                     case ctrl.options.ellipsis:
//                         return m('span.page-ellipsis', m.trust(page))
//                         break;

//                     default:
//                         return m('a', {
//                             onclick: m.withAttr('data-page', ctrl.page),
//                             'data-page': page,
//                             className: page == ctrl.page() ? 'page-current' : ''
//                         }, parseInt(page) + 1)
//                         break;

//                 }

//             }),
//             m('a', {
//                 onclick: ctrl.nextPage,
//                 class: ctrl.page() == (ctrl.totalPages() - 1) ? 'disabled' : ''
//             }, 'Next page'),
//         ]),
//         m('label', 'Per page: '),
//         m('select', {
//             onchange: m.withAttr('value', ctrl.changePerPage)
//         }, [
//             m('option', 5),
//             m('option', 10),
//             m('option', 15)
//         ])
//     ]);

// }


// module.exports = app;

//--------------------------------


// var mpaginate = require('../../../shared/mithril.paginate.js');
// module.exports = mpaginate;
//-------------------------------------------
// var mpaginate = require('../../../shared/mithril.paginate.js');

// // Mock some data
// var items = [];

// for (var i = 0; i<15; i++) {
//     items.push({'name':'Item #'+i})
// }

// /**
//  * Your Module
//  */

// var app = {},
//     options = {
//         perPage  : 5,               
//         data     : items,
//         limit    : 10,      
//         ellipsis : '&hellip;',
//         edges    : 2
//     };

// /* Controller */
// app.controller = function(){


//     this.paginate = new mpaginate.controller(options)

// }


// /* View */
// app.view = function(ctrl){
//     return m('',[
//         mpaginate.view(ctrl.paginate)
//     ]);           
// }

// module.exports = app;

//---------------------------------
// // Mock some data
// var items = [];

// for (var i = 0; i<15; i++) {
//     items.push({'name':'Item #'+i})
// }

// /**
//  * Your Module
//  */

// var app = {},
//     options = {
//         perPage  : 5,               
//         data     : items,
//         limit    : 10,      
//         ellipsis : '&hellip;',
//         edges    : 2
//     };

// /* Controller */
// app.controller = function(){


//     this.paginate = new mpaginate.controller(options)

// }


// /* View */
// app.view = function(ctrl){
//     return [
//         mpaginate.view(ctrl.paginate)
//     ]           
// }



// /* Initialize the app */

// m.module(document.getElementById('paginate'), app)
//---------------------------------------
// var m = require('mithril');
// var pagination = require('pagination');

// var boostrapPaginator = new pagination.TemplatePaginator({
//     prelink:'/', current: 3, rowsPerPage: 200,
//     totalResult: 10020, slashSeparator: true,
//     template: function(result) {
//         var i, len, prelink;
//         var html = '<div><ul class="pagination">';
//         if(result.pageCount < 2) {
//             html += '</ul></div>';
//             return html;
//         }
//         prelink = this.preparePreLink(result.prelink);
//         if(result.previous) {
//             html += '<li><a href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
//         }
//         if(result.range.length) {
//             for( i = 0, len = result.range.length; i < len; i++) {
//                 if(result.range[i] === result.current) {
//                     html += '<li class="active"><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
//                 } else {
//                     html += '<li><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
//                 }
//             }
//         }
//         if(result.next) {
//             html += '<li><a href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
//         }
//         html += '</ul></div>';
//         return html;
//     }
// });
// console.log(boostrapPaginator.render());
//-------------------------------------
// var m = require('mithril');
// var pagination = require('pagination');
// // var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
// // console.log(paginator.render());

// var Pagination = {
//     controller:function(){
//         var ctrl = this;
//         ctrl.paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
//         console.log(ctrl.paginator.render());
//     },
//     view: function(ctrl){
//         // return m('', ctrl.paginator.render());
//         return m.trust(ctrl.paginator.render());
//     }
// }

// module.exports = Pagination;
//--------------------------------------
// var m = require('mithril');

// var pagination = {
//     controller: function(arg) {
//         var ctrl = this;
//         ctrl.totalSize = 100;
//         ctrl.pageSize = 5;
//         ctrl.totalPageNum = Math.floor(ctrl.totalSize / ctrl.pageSize);
//         ctrl.pageNum = 2;
//         ctrl.minPageNum = ((ctrl.pageNum - 2) > 0) ? (ctrl.pageNum - 2) : 1;
//         ctrl.maxPageNum = (ctrl.pageNum + 2 > ctrl.totalPageNum) ? ctrl.totalPageNum : ctrl.pageNum + 2;
//         ctrl.loop = ctrl.maxPageNum - ctrl.minPageNum;

//     },
//     view: function(ctrl, arg) {
//         return m('nav.text-center', m('ul.pagination', [
//             m('li', m('a', {
//                 href: "#",
//                 ariaLabel: "Previous"
//             }, m('span', {
//                 ariaHidden: true
//             }, '<<'))),
//             m('li', m('a', {
//                 href: "#"
//             }, ctrl.pageNum - 2)),
//             m('li', m('a', {
//                 href: "#"
//             }, ctrl.pageNum - 1)),
//             m('li', m('a', {
//                 href: "#"
//             }, ctrl.pageNum)),
//             m('li.disabled', m('a', {
//                 href: "#"
//             }, ctrl.pageNum + 1)),
//             m('li', m('a', {
//                 href: "#"
//             }, ctrl.pageNum + 2)),
//             m('li', m('a', {
//                 href: "#",
//                 ariaLabel: "Next"
//             }, m('span', {
//                 ariaHidden: true
//             }, '>>'))),
//         ]));
//     }
// }

// module.exports = pagination;
