var m = require('mithril');
var mpaginate = require('../../../shared/mithril.paginate.modified');

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

