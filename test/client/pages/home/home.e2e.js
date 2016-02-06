var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('home', function() {
    it('should have title "app"', function(done) {
        browser
             .url(config.baseUrl)
             .getTitle()
             .then(function(title) {
                 expect(title).toBe('app');
                 done();
              });
    });
});
