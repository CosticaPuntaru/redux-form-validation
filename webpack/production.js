'use strict';

var webpack = require('webpack');
var baseConfig = require('./base');

var config = Object.create(baseConfig);
config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false
        }
    })
];

module.exports = config;