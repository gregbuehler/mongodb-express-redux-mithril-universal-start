var expect = require('expect');

beforeEach(function() {

});

describe('done: Google website', function() {
    it('should have title "Google"', function(done) {
        browser
             .url('http://google.com')
             .getTitle()
             .then(function(title) {
                 expect(title).toBe('Google');
                 done();
              });
    });
});
