var express = require('express');
var app = express();

app.get('/', function (req, res) {
    // create an error and pass it to the next function
    var err = new Error("something were wrong")
    next(err);
});

// other route handlers and middleware here

// an error handling middleware
app.use(function (err, req, res, next) {
    res.status(500);
    res.send("oops, something went wrong.");
});

app.listen(3000);