var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('user', function() {

    it('can lead to User page after logged in as admin', function(done) {
        browser
            .url(config.baseUrl + '/login')
            .setValue('#inputUserid', 'admin')
            .setValue('#inputPassword', 'admin')
            .click('#loginSubmit')
            .waitForExist('a[href="/profile"]')
            .click('a[href="/users"]')
            .waitForExist('.col-md-12 h1 span')
            .getText('.col-md-12 h1 span')
            .then(function(text) {
                // console.log(text);
                expect(text).toBe('Users');
                done();
            });
    })
});
