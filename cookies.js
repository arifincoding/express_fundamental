var express = require('express')
var app = express();

var cookieParser = require('cookie-parser')
app.use(cookieParser())


app.get('/', function (req, res) {
    res.cookie('name', 'express').send('cookie set') //set name = express
    console.log('Cookies: ', req.cookies);
})

// cookie with expiration time
app.get('/exp', function (req, res) {
    res.cookie('name', 'value', {
        expire: 3600 + Date.now()
    }).send('cookie set') //set name = express
    console.log('Cookies: ', req.cookies);
})

app.get('/exp2', function (req, res) {
    res.cookie('name', 'value2', {
        maxAge: 36000
    }).send('cookie set') //set name = express
    console.log('Cookies: ', req.cookies);
})

// delete the cookie with name
app.get('/clear_cookie', function (req, res) {
    res.clearCookie('value2')
    res.send('cookie value2 cleared')
})

app.listen(3000)