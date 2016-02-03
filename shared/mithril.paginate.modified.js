var m = require('mithril');

/* Module */

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

// console.log('paginate37-options', options);

        /* Extend options */

        this.options = extend(defaultOptions, options);

        this.perPage = (this.options.perPage)

        this.page = (this.options.page - 1);

// console.log('paginate47-this.options', this.options);

        /* Items */

        // this.items = m.prop(this.options.data || []);

        /* Total pages */

        this.totalPages = (Math.ceil(this.options.count/ this.perPage))
// console.log('paginate55-this.totalPages', this.totalPages);

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
// console.log('84-p', p);
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

            this.page = (current)

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

            this.page = (current)


        }.bind(this)


        /**
         * Change perPage
         */

        this.changePerPage = function(value) {

            this.perPage = (value)

            /* Recalculate total pages */

            this.totalPages = (Math.ceil(this.options.count / this.perPage))

            /* Jump to page 1 */

            this.page = (0);

        }.bind(this)

        //phs
        this.setPage = function(value){
        	console.log('paginate148-value', value);
        	this.page = value;
        }

        this.changePage = function(e){
        	console.log('pagenate153-e', e);
        }
    }

    /**
     * View
     * @return {[type]} [description]
     */
    app.view = function(ctrl) {
        return [
            // m('ul.items', [
            //     ctrl.items()
            //     .slice(ctrl.page() * ctrl.perPage(), (parseInt(ctrl.page()) + 1) * ctrl.perPage())
            //     .map(function(item) {
            //         return m('li', item.name)
            //     })
            // ]),

            m('nav.text-center', m('ul.pagination', [
                m('li', m('a', {
                    onclick: ctrl.prevPage,
                    class: ctrl.page == 0 ? 'disabled' : ''
                }, '<<')),
                ctrl.pageList().map(function(page) {

                    switch (page) {

                        case ctrl.options.ellipsis:
                            return m('li', m('span.page-ellipsis', m.trust(page)))
                            break;

                        default:
                            return m('li', m('a', {
                                // onclick: m.withAttr('data-page', ctrl.page),
                                // onclick: function(){ m.withAttr('data-page', ctrl.setPage)},
                                // href: '/blog/' + (page +1) + '/api',
                                href: '/blog/' + (page +1),
                                config: m.route,
                                // onclick: ctrl.changePage,
                                'data-page': page,
                                className: page == ctrl.page ? 'page-current' : ''
                            }, parseInt(page) + 1));
                            break;

                    }

                }),
                m('li', m('a', {
                    onclick: ctrl.nextPage,
                    class: ctrl.page == (ctrl.totalPages - 1) ? 'disabled' : ''
                }, '>>')),
            ])),
            m('.text-center',
                m('label.label-success', {
                    style: 'padding:1px 4px 1px 4px;color:white'
                }, 'Per page: '),
                m('select', {
                    onchange: function(e){ctrl.changePerPage = e.target.value;}
                }, [
                    m('option', 5),
                    m('option', 10),
                    m('option', 15)
                ])),
            m('br'),
            m('br'),
        ]

    }


    return app;

})(mpaginate || {});

module.exports = mpaginate;
