var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(upload.array());

// require the router we defined in movies.js
var movies = require('./movies.js');

// use the router on the sub route /movies
app.use('/movies', movies);

app.listen(3000);