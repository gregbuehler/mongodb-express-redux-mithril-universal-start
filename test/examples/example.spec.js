var expect = require('expect');
var m = require('mithril');
//var app = require('../../client/js/app.js');

beforeEach(function() {
    m.route.mode = 'pathname';
});

describe('m.route', function() {
    it('should be a function', function() {
        expect(m.route).toExist();
    });

    it('mode should be pathname', function() {
        expect(m.route.mode).toBe('pathname');
    });
});
