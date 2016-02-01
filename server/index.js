var path = require('path'),
    fs = require('fs'),
    dotenv = require('dotenv'),
    express = require('express'),
    app = express(),
    pubDir = path.join(__dirname, '..', 'client'),
    envFile = path.join(__dirname, '..', '.env'),
    lessMiddleware = require('less-middleware'),
    mongoose = require('mongoose'),
    browserify = require('browserify-middleware'),
    config = require('../site/config'),
    bodyParser = require('body-parser'),
    urlParse = bodyParser.urlencoded({
        extended: true
    }),
    jsonParse = bodyParser.json();

global.__server__ = config.useServerRender;
global.__client__ = config.useClientRender;
global.__useBlog__ = config.useBlog;

var pages = require('./routes/pages'),
    api = require('./routes/api');


// load up .env file
if (fs.existsSync(envFile)) {
    dotenv.load();
}

var mongo_url = process.env.MONGO_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGOSOUP_URL;
if (!mongo_url) {
    // var mockgoose = require('mockgoose');
    // mockgoose(mongoose);
    // mockgoose.reset();
    mongo_url = config.mongo.uri;
}

mongoose.connect(mongo_url);

if (config.seedUser) {
    require('../site/seedUser')();
    config.seedUser = false;
}
if (config.seedPost) {
    require('../site/seedPost')();
    config.seedPost = false;
}
// use models after potential mockgoose
var auth = require('./routes/auth');

// serve up CSS from LESS. this is efficiently cached.
app.use(lessMiddleware(pubDir, {
    parser: {
        paths: [path.join(__dirname, '..')]
    }
}));

// // static server
app.use(express.static(pubDir));

// keep all auth-related routes at /auth/whatevs
app.use('/auth', auth);

app.use('/api', [urlParse, jsonParse], api);
// app.use('/api', api);

//experiment------------------------------------------------------
var homePage = require('./pages/home');
app.use('/', homePage);

//-------------------------------------------------
var blog = require('./pages/blog');
var postPage = require('./pages/blog/post');
app.use('/blog', blog);
app.use('/post', postPage);
//======================================================

if (global.__server__) {
    if (global.__client__) {
        // browserify the entry-point. this is efficiently cached if NODE_ENV=production
        app.get('/app.js', browserify(path.join(pubDir, 'js', 'app.js'), {}));
    }
    //server-side render
    app.use(pages);
    app.get('/*', function(req, res) {
        res.redirect('/');
    });

} else {
    // browserify the entry-point. this is efficiently cached if NODE_ENV=production
    app.get('/app.js', browserify(path.join(pubDir, 'js', 'app.js'), {}));
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'index.html'));
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
