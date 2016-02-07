'use strict';

var config = require('./site/config');
var webpackConfig;

if (config.env === 'development') {
    webpackConfig = require('./webpack/webpack.config.development');
} else if (config.env === 'production') {
    webpackConfig = require('./webpack/webpack.config.production');
} else if (config.env === 'test') {
    webpackConfig = require('./webpack/webpack.config.test');
}

module.exports = webpackConfig;
