var m = require('mithril');
var mpaginate = require('../../../shared/mithril.paginate.modified');

// Mock some data
// var items = [];
// for (var i = 0; i < 105; i++) {
//     items.push({
//         'name': 'Item #' + i
//     })
// }

/**
 * Your Module
 */

var app = {},
    options = {
        perPage: 3,
        // data: items
    };
/* Controller */
app.controller = function(arg) {
        // console.log('Paginator24', arg);
        options.count = arg.count;
        options.pagenum = arg.pagenum;

        this.paginate = new mpaginate.controller(options)

    }
    /* View */
app.view = function(ctrl, arg) {
    return m('', [
        mpaginate.view(ctrl.paginate)
    ]);
}
module.exports = app;

    // var defaultOptions = {
    //     perPage: 10,
    //     page: 1,
    //     limit: 10,
    //     ellipsis: '&hellip;',
    //     edges: 2
    // }