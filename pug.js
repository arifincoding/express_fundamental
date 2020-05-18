var express = require('express')
var app = express()

app.set('view engine', 'pug')
app.set('views', './views')

// cara 1
app.use(express.static('public'))
// cara 2
app.use('/static', express.static('public'))

app.get('/first_template', function (req, res) {
    res.render('first_view')
})

app.get('/dynamic_view', function (req, res) {
    res.render('dynamic', {
        name: "arifin",
        url: "http://www.facebok.com"
    })
})

app.get('/conditionals', function (req, res) {
    res.render('conditionals', {
        user: {
            name: "arifin",
            age: "20"
        }
    })
})

app.get('/components', function (req, res) {
    res.render('content')
})

app.listen(3000)