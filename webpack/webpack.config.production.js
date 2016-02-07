//----------------------------------------------------//
// webpack.config.js
var webpack = require("webpack"),
    // HtmlWebpackPlugin = require('html-webpack-plugin'),
    // config = require('./config'),
    // LiveReloadPlugin = require('webpack-livereload-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: {
        app: './client/js/app.js',
        // vendor: ['mithril']
    },
    output: {
        path: './build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [{
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.less$/,
                loaders: ["style", "css", "less"]
            }, {
                test: /\.css$/,
                loader: 'style!css'
            },

            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },

    plugins: [
        // For test purpose, it is desirable that m be provided to each component.
        // new webpack.ProvidePlugin({
        //     m: "mithril"
        // }),
        // new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.bundle.js"),
        // new HtmlWebpackPlugin({
        //     // defaults to produce index.html
        //     filename: 'index.template.html',
        //     title: 'mithril-redux',
        //     // template: './shared/index.template.html',
        //     favicon: "./shared/favicon.ico",
        //     // baseUrl: config.baseUrl
        // }),
        // new LiveReloadPlugin({
        //     appendScriptTag: true
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{
            from: './client/style/app.css',
            to: './style/app.css'
        }, {
            from: './client/fonts',
            to: './fonts'
        }])
    ]
};
