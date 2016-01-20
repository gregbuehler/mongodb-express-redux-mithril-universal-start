var node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var config = require('./environment/' + node_env + '.js');
module.exports = config;