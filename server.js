/**
 * Created by Hou, Bing on 01/10/2016.
 */

// Load required packages
var fs = require('fs');
var path = require('path');
var express = require('express');
var compression = require('compression');
var secrets = require('./config/secrets');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

// Connect to the mongoDb
// mongoose.connect(secrets.db);

// Load controllers
var homeController = require('./controllers/home');
var authController = require('./controllers/auth');

// Create our Express application
var app = express();

// Tell expess to user sessions
app.use(session({
    secret: secrets.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

// Add content compression middleware
app.use(compression());

// Use ejs as the view template
app.set('view engine', 'ejs');

// Add static middleware
var oneDay = 24 * 60 * 60 * 1000;   // contents are cached for one day
app.use(express.static(path.normalize(__dirname + '/public'), {maxAge: oneDay}));

// Create our Express router
var router = express.Router();

// index page route
//router.get('/', homeController.index);
router.get('/', homeController.show);

// show page route
router.get('/show', homeController.show);

// test page route
router.get('/test', homeController.index);

// auth routes
router.get('/auth/twitter', authController.twitter);
router.get('/auth/twitter/callback', authController.twitterCallback, function(req, res) {
    res.redirect(req.session.returnTo || '/');
});

// Register all our routes
app.use(router);

// get the list of all audio files
fs.readdir(path.normalize(__dirname + '/public/audio'), function(err, files){
 if(!err)
 {
     var audio_files = [];
     files.forEach(function(file){
        audio_files.push(file);
     })
     app.set('audio_files', audio_files);
 }
});

// Start the server
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});
