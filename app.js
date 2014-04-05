/*global require, module, process, console*/

// MODULES
var express     = require('express');
var MongoStore  = require('connect-mongo')(express);
var app         = express();
var port        = process.env.PORT || 8080;
var mongoose    = require('mongoose');
//var passport    = require('passport');

var configDB    = require('./config/database');


// DATABASE
mongoose.connect(configDB.url);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
    'use strict';
    console.log('Database connected...');
});


// CONFIGURATION
//require('./config/passport')(passport); // pass passport for configuration

app.configure(function () {
    'use strict';
    // set up express application
    app.use(express.logger('dev'));
    app.use(express.cookieParser()); // read cookies
    app.use(express.json());
    
    // set up passport authentication
//    app.use(express.session(
//        {
//            secret: 'webtree-secret',
//            store: new MongoStore({ db: db.db })
//        }
//    ));
    //app.use(passport.initialize());
    //app.use(passport.session()); // persistent login sessions
});


// ROUTES
var defaultRoutes   = require('./routes/default')(app);
//var authRoutes      = require('./routes/auth')(app);
var userRoutes      = require('./routes/user')(app);


// STARTING SERVER
console.log('listening on port ' + port);

app.listen(port);