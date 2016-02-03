var m = require('mithril');

/* Module */

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
var mpaginate = (function(app) {
    var defaultOptions = {
        perPage: 10,
        page: 1,
        limit: 10,
        ellipsis: '&hellip;',
        edges: 2
    }

    /**
     * Extend
     */
    var extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    /**
     * Controller
     * @return {[type]} [description]
     */
    app.controller = function(options) {


        /* Extend options */

        this.options = extend(defaultOptions, options);

        this.perPage = (this.options.perPage)

        this.page = (this.options.page - 1);
        
        this.baseRoute = this.options.baseRoute;

        /* Total pages */

        this.totalPages = (Math.ceil(this.options.count / this.perPage))

        /**
         * Page list
         */

        this.pageList = function() {

            var p = [],
                start = 0,
                end = this.totalPages,
                left = Math.max(parseInt(this.page) - this.options.edges, 0),
                right = Math.min(parseInt(this.page) + this.options.edges, this.totalPages)

            for (var i = start; i < end; i++) {

                if (i == 0 || i == parseInt(this.totalPages) - 1 || this.totalPages < this.options.limit) {

                    p.push(i)

                } else {

                    if (i == (right + 1) || i == (left - 1)) p.push(this.options.ellipsis)

                    if (i <= right && i >= left) p.push(i)
                }
            }
            return p;

        }.bind(this)



        /**
         * Next page
         */

        this.nextPage = function() {

            var current = this.page;

            ++current;

            if (current > (this.totalPages - 1)) {
                current = (this.totalPages - 1);
            }

            this.page = current;

            m.route(this.options.baseRoute + '/' + (current + 1));

        }.bind(this)

        /**
         * Prev page
         */

        this.prevPage = function() {

            var current = this.page;

            --current;

            if (current < 0) {
                current = 0;
            }

            this.page = current

            m.route(this.options.baseRoute + (current === 0 ? '' : '/' + (current + 1)));

        }.bind(this)


        /**
         * Change perPage
         */

        // this.changePerPage = function(value) {
        //     console.log('change');
        //     this.perPage = (value)

        //     /* Recalculate total pages */

        //     this.totalPages = (Math.ceil(this.options.count / this.perPage))

        //     /* Jump to page 1 */

        //     this.page = 0;
        //     m.route(this.options.baseRoute);

        // }.bind(this)
    }

    /**
     * View
     * @return {[type]} [description]
     */
    app.view = function(ctrl) {
        return [

            m('nav.text-center', m('ul.pagination', [
                m('li', {
                    className: ctrl.page == 0 ? 'disabled' : ''
                }, m('a', {
                    onclick: ctrl.prevPage,
                }, '<<')),
                ctrl.pageList().map(function(page) {

                    switch (page) {

                        case ctrl.options.ellipsis:
                            return m('li', m('span.page-ellipsis', m.trust(page)))
                            break;

                        default:
                            return m('li', {
                                className: page === (ctrl.page) ? 'active' : ''
                            }, m('a', {
                                href: page === 0 ? ctrl.baseRoute : ctrl.baseRoute + '/' + (page + 1),
                                config: m.route,
                            }, page + 1));
                            break;

                    }

                }),
                m('li', {
                    className: ctrl.page == (ctrl.totalPages - 1) ? 'disabled' : ''
                }, m('a', {
                    onclick: ctrl.nextPage,
                }, '>>')),
            ])),
            // m('.text-center',
            //     m('label.label-success', {
            //         style: 'padding:1px 4px 1px 4px;color:white'
            //     }, 'Per page: '),
            //     m('select', {
            //         onchange: ctrl.changePerPage
            //     }, [
            //         m('option', 5),
            //         m('option', 10),
            //         m('option', 15)
            //     ])),
            // m('br'),
            // m('br'),
        ]

    }


    return app;

})(mpaginate || {});

module.exports = mpaginate;
