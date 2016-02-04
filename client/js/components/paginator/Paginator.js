var m = require('mithril');
var mpaginate = require('../../../../shared/mithril.paginate.modified');


/**
 *var defaultOptions = 
 *{
 *   perPage: 10,
 *   page: 1,
 *   data: Array,
 *   limit: 10 // Page number limit when should ellipsis text be display
 *   ellipsis: '&hellip;',
 *   edges: 2 // Number of pages before and after the current page
 *}
 */

// var app = {},
//     options = {};

var app = {};

/* Controller */
app.controller = function(arg) {
        // options.count = arg.count;
        // options.page = arg.page;
        // options.perPage = arg.perPage;
        // options.baseRoute = arg.baseRoute;
        var options = arg;

        this.paginate = new mpaginate.controller(options)

    }
    /* View */
app.view = function(ctrl, arg) {
    return m('', [
        mpaginate.view(ctrl.paginate)
    ]);
}
module.exports = app;


