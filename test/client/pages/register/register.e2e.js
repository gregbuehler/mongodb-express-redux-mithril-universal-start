var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('register', function() {
    it('should have "register" text', function(done) {
        browser
            .url(config.baseUrl + '/register')
            .getText('.form-signin h1')
            .then(function(text) {
            	// console.log(text);
                expect(text).toBe('register');
                done();
            });
    });
});
