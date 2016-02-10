var path = require('path'),
    fs = require('fs'),
    dotenv = require('dotenv'),
    express = require('express'),
    app = express(),
    envFile = path.join(__dirname, '..', '.env'),
    lessMiddleware = require('less-middleware'),
    mongoose = require('mongoose'),
    browserify = require('browserify-middleware'),
    config = require('../site/config'),
    pubDir = config.useWebpack ? path.join(__dirname, '..', 'build') : path.join(__dirname, '..', 'client'),
    favicon = require('serve-favicon');

var api = require('./api');
app.use(favicon(__dirname + '/../site/favicon.ico'));

global.__server__ = config.useServerRender;
global.__client__ = config.useClientRender;
global.__useBlog__ = config.useBlog;

// load up .env file
if (fs.existsSync(envFile)) {
    dotenv.load();
}

var mongo_url = process.env.MONGO_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGOSOUP_URL || config.mongo.uri;
if (!mongo_url) {
    var mockgoose = require('mockgoose');
    mockgoose(mongoose);
    mockgoose.reset();
    mongo_url = 'mongodb://localhost/merm';
}

mongoose.connect(mongo_url);

if (config.seedUser) {
    //Reset verify DB.
    require('../site/seedVerify')();

    //Create users.
    require('../site/seedUser')();
    config.seedUser = false;
}
if (config.seedPost) {
    require('../site/seedPost')();
    config.seedPost = false;
}
// use models after potential mockgoose

// serve up CSS from LESS. this is efficiently cached.
app.use(lessMiddleware(pubDir, {
    parser: {
        paths: [path.join(__dirname, '..')]
    }
}));

// static server
app.use(express.static(pubDir));

if (global.__server__) {
    if (global.__client__) {

        if (!config.useWebpack) {
            // browserify the entry-point. this is efficiently cached if NODE_ENV=production
            app.get('/app.js', browserify(path.join(pubDir, 'js', 'app.js'), {}));
        }

    }
    
    //server-side data
    app.use('/api', api);

    //server-side render
    var pages = require('./pages');
    app.use(pages);

    app.get('/*', function(req, res) {
        res.redirect('/');
    });

} else {
    if (global.__client__) {

        if (!config.useWebpack) {
            // browserify the entry-point. this is efficiently cached if NODE_ENV=production
            app.get('/app.js', browserify(path.join(pubDir, 'js', 'app.js'), {}));
        }

        //server-side data
        app.use('/api', api)
    }

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.client.html'));
    });
}

if (require.main === module) {
    var port = process.env.PORT || 3000;
    app.listen(port, function() {
        console.log('Listening on http://localhost:' + port);
        if (config.env === 'development' && config.useBrowsersync === true) {
            /**
             * Require Browsersync
             */
            var browserSync = require('browser-sync');

            /**
             * Run Browsersync with proxy config
             * Proxy is the main server of this app 
             */
            browserSync({
                //Use the main server as proxy
                proxy: config.baseUrl,
                //The client-side files are watched by browsersync. The server-related files are watched by nodemon
                files: ["./client"]
            });
        }

    });
}



module.exports = app;
