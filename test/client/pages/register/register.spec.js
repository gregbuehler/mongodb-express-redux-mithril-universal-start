var expect = require('expect');
var register = require('../../../../client/js/pages/register/Register.js');
var mockEvent;
var ctrl;

beforeEach(function() {
    mockEvent = {
        preventDefault: function() {},
        target: {
            isTest: true,
            userid: {
                value: 'test'
            },
            email: {
                value: 'test@test.com'
            },
            password: {
                value: 'test'
            },
            password2: {
                value: 'test'
            }
        }

    };

    ctrl = new register.controller;

});

describe('register', function() {
    describe('userid', function() {
        it('default user has no error', function() {

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('userid cannot start number', function() {

            mockEvent.target.userid.value = '1test';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('userid can be as long as 20 chars', function() {

            mockEvent.target.userid.value = 't1234567890123456789';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('userid cannot be longer than 20 chars', function() {

            mockEvent.target.userid.value = 't12345678901234567890';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('userid cannot contain special char', function() {

            mockEvent.target.userid.value = 't1234567890$';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('userid cannot be shorter than 4 char', function() {

            mockEvent.target.userid.value = 't12';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('userid cannot have space', function() {

            mockEvent.target.userid.value = 't12 3';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });
    });

    describe('password', function() {
        it('default password has no error', function() {

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('password can start number', function() {

            mockEvent.target.password.value = '1test';
            mockEvent.target.password2.value = '1test';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('password can be as long as 20 chars', function() {

            mockEvent.target.password.value = '12345678901234567890';
            mockEvent.target.password2.value = '12345678901234567890';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('password cannot be longer than 20 chars', function() {

            mockEvent.target.password.value = '123456789012345678901';
            mockEvent.target.password2.value = '123456789012345678901';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('password can contain special char', function() {

            mockEvent.target.password.value = 't1234567890$';
            mockEvent.target.password2.value = 't1234567890$';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('password cannot be shorter than 4 char', function() {

            mockEvent.target.password.value = 't12';
            mockEvent.target.password2.value = 't12';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('password cannot have space', function() {

            mockEvent.target.password.value = 't12 3';
            mockEvent.target.password2.value = 't12 3';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('password and password2 must match', function() {

            mockEvent.target.password.value = 'test';
            mockEvent.target.password2.value = 'test2';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });
    });

    describe('email', function() {
        it('default email has no error', function() {

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toBe('');
        });

        it('email should have id', function() {

            mockEvent.target.email.value = '@test.com';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('email should have @', function() {

            mockEvent.target.email.value = 'testtest.com';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });


        it('email should have only one @', function() {

            mockEvent.target.email.value = 'test@@test.com';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });


        it('email should not contain space', function() {

            mockEvent.target.email.value = 'test@tes t.com';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });

        it('email should have .', function() {

            mockEvent.target.email.value = 'test@testcom';

            ctrl.register(mockEvent);
            expect(ctrl.errmsg).toNotBe('');
        });


    });
});
