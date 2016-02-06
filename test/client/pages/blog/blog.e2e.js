var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('blog', function() {
    it('should have "Blog" text', function(done) {
        browser
            .url(config.baseUrl + '/blog')
            .getText('.col-md-12 h1 span')
            .then(function(text) {
            	// console.log(text);
                expect(text).toBe('Blog');
                done();
            });
    });
});
