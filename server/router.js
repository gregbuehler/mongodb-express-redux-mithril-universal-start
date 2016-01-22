var express = require('express'),
    render = require('mithril-node-render');
var home = require('../client/js/pages/Home');

var router = module.exports = express();

router.get('/', function(req, res) {
    console.log('router6');
    // var content = render(home);
    var content = render(home);
    var path = '/';
    var state = {
        theme: ''
    };
    res.type('html');
    res.end(base(content, path, state));
});


// router.get('/', function(req, res) {
//     console.log('router6');
//     // var content = render(home);
//     var content = 'content';
//     var path = '/';
//     var state = {
//         theme: ''
//     };
//     res.type('html');
//     res.end(base(content, path, state));
// });

// router.get('/home', function(req, res) {
//     console.log('router6');
//     var content = 'hi home';
//     var path = '/';
//     var state = {
//         theme: ''
//     };
//     res.type('html');
//     res.end(base(content, path, state));
// });

// function base(content, path, state) {
//     // console.log('router377-server-resource.getState(req.path)', path);
//     return [
//         '<!doctype html>',
//         '<html>',
//         '<head>',
//         '<title>mongoDB-express-redux-mithril</title>',
//         '<meta charset="utf-8">',
//         '<link rel="stylesheet" href="/css/' + state.theme + '/bootstrap.min.css" crossorigin="anonymous">',
//         '<link rel="stylesheet" href="/css/modal-animation.css" crossorigin="anonymous">',
//         '<link rel="stylesheet" href="/css/modal-skin.css" crossorigin="anonymous">',
//         '<link rel="stylesheet" href="/css/modal.css" crossorigin="anonymous">',
//         '<link rel="stylesheet" href="/css/site.css" crossorigin="anonymous">',
//         '<link rel="stylesheet" href="/css/metroicons.min.css" crossorigin="anonymous">',
//         '<link rel="stylesheet" href="/css/app.css" crossorigin="anonymous">',
//         '<script>',
//         'window._state = {};',
//         'window._state[\'' + path + '\'] = JSON.parse(\'' + JSON.stringify(state) + '\');',
//         '</script>',
//         '</head>',
//         '<body>',
//         '<div id="board"></div>',
//         '<div id="main">',
//         content,
//         '</div>',
//         // '<script src="/vendor.bundle.js"></script>',
//         // '<script src="/app.bundle.js"></script>',
//         '</body>',
//         '</html>'
//     ].join('');
// }

function base(content) {
    return [
        '<!DOCTYPE html>',
        '<html lang = "en">',
        '<head>',
        '<meta charset = "utf-8">',
        '<meta http - equiv = "X-UA-Compatible" content = "IE=edge"> ',
        '<meta name = "viewport" content = "width=device-width, initial-scale=1"> ',
        '<title> app </title>',
        '<link href = "/style/app.css" rel = "stylesheet" /> ',
        '</head>',
        '<body>',
        '<div id = "root">',
        content,
        '</div>',
        '<script src = "https://cdn.polyfill.io/v1/polyfill.min.js"></script>',
        // '<script src = "/app.js"></script>',
        '</body>',
        '</html>'
    ].join('');
}
