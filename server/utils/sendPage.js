var render = require('mithril-node-render');


function base(content, state) {

    var stateToSend =
        (global.__server__ && state)?
        '<script>window.__state__ = window.__state__ || {}; window.__state__[\"' + state.key + '\"] = ' + JSON.stringify(state) + ';</script>' :
        null;

    var scriptToSend = (global.__client__ ? '<script src = "/app.js"></script>' : null);

    return [
        '<!DOCTYPE html>',
        '<html lang = "en">',
        '<head>',
        '<meta charset = "utf-8">',
        '<meta http - equiv = "X-UA-Compatible" content = "IE=edge"> ',
        '<meta name = "viewport" content = "width=device-width, initial-scale=1"> ',
        '<title> app </title>',
        '<link href = "/style/app.css" rel = "stylesheet" /> ',
        stateToSend,
        '</head>',
        '<body>',
        '<div id = "root">',
        content,
        '</div>',
        '<script src = "https://cdn.polyfill.io/v1/polyfill.min.js"></script>',
        scriptToSend,
        '</body>',
        '</html>'
    ].join('');
}

var sendPage = function sendPage(res, page, state) {
    res.type('html');
    res.end(base(render(page), state));
}

module.exports = sendPage;
