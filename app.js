/*global require, module, process, console*/

// MODULES
var express     = require('express');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var cookieParser  = require('cookie-parser');
var MongoStore  = require('connect-mongo')(session);
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
//app.use(express.logger('dev'));
app.use(bodyParser.json())
app.use(cookieParser('')); // read cookies

// ROUTES
var defaultRoutes   = require('./routes/default')(app);
//var authRoutes      = require('./routes/auth')(app);
var userRoutes      = require('./routes/user')(app);


// STARTING SERVER
console.log('listening on port ' + port);

app.listen(port);