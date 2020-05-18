var express = require('express')
var app = express()

// first middleware before response is sent
app.use(function (req, res, next) {
    console.log("start")
    next()
})

// route handler
app.get('/hello', function (req, res, next) {
    res.send("Middle")
    next()
})

app.use('/hello', function (req, res) {
    console.log('End')
})

app.listen(3000)