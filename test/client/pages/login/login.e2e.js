var expect = require('expect');
var config = require('../../../../site/config');

beforeEach(function() {

});

describe('login', function() {
    it('should have  text "login"', function(done) {
        browser
            .url(config.baseUrl + '/login')
            .getText('.form-signin h1')
            .then(function(text) {
                // console.log(text);
                expect(text).toBe('login');
                done();
            });
    });

    it('should accept login "admin/admin"', function(done) {
        browser
            .setValue('#inputUserid', 'admin')
            .setValue('#inputPassword', 'admin')
            .click('#loginSubmit')
            .waitForExist('a[href="/profile"]')
            .then(function(exist) {
                // console.log(exist);
                expect(exist).toBe(true);
                done();
            })
    })

    it('should log out when logout is clicked', function(done) {
        browser
            .click('a[href="/logout"]')
            .waitForExist('a[href="/login"]')
            .then(function(exist) {
                // console.log(exist);
                expect(exist).toBe(true);
                done();
            })
    })

});
