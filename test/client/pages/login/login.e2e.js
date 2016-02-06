var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('login', function() {
    it('should have "login" text', function(done) {
        browser
            .url(config.baseUrl + '/login')
            .getText('.form-signin h1')
            .then(function(text) {
            	// console.log(text);
                expect(text).toBe('login');
                done();
            });
    });
});
