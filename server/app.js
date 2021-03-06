// HTTP server using Express to handle incoming requests
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan'); // helps log all requests

//var cookieParser = require('cookie-parser'); // for handling cookies
var bodyParser = require('body-parser'); // for parsing request URL

// set up logger and parsers
app.use(logger('dev')); // set up logger and parsers\

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

//app.use(cookieParser());

// Static route for client-side code generated by Angular
app.use('/', express.static(__dirname + '/../client/public'));

//Database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://main:main123@ds115283.mlab.com:15283/linkterest" || "mongodb://localhost:27017/post");


var index = require('./index');
// Our ReST API
var api = require('./post_api');

app.use(function (req, res, next) {
    // Website I want to allow, * means allow all
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods that are allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Passing to next layer of the middleware software
    next();
});

app.use('/', index);
app.use('/api', api);

// Function to handle client errors
/*app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/
// start the server
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.log('Server listening on port 8080!');
});

module.exports = app;
