// var expect = require('expect');
// var m = require('mithril');
// //var app = require('../../client/js/app.js');

// beforeEach(function() {
//     m.route.mode = 'pathname';
// });

// describe('m.route', function() {
//     it('should be a function', function() {
//         expect(m.route).toExist();
//     });

//     it('mode should be pathname', function() {
//         expect(m.route.mode).toBe('pathname');
//     });
// });

// var register = require('../../client/js/pages/register/Register.js');
// var mockEvent;
// beforeEach(function() {
//     mockEvent = {
//         preventDefault: function() {},
//         target: {
//             userid: {
//                 value: 'test'
//             },
//             email: {
//                 value: 'test@test.com'
//             },
//             password: {
//                 value: 'test'
//             },
//             password2: {
//                 value: 'test'
//             }
//         }

//     };

// });
// describe('register', function() {
//     it('mockEvent has no error', function() {
//         var ctrl = new register.controller;

//         ctrl.register(mockEvent);
//         console.log(ctrl);
//         expect(ctrl.errmsg).toBe('q');
//     });
// });
