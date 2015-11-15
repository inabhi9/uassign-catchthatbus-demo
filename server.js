// modules =================================================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    session = require('express-session');
// configuration ===========================================

// config files
var conf = require('./config/main');

mongoose.connect(conf.dbUrl);

require('./config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(session({
        secret: 'ilovescotchscotchyscotchscotch',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 60000}
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// routes ==================================================
require('./app/routes')(app, passport); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
