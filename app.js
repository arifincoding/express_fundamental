const express = require('express')
const app = express()
const port = 3000

var things = require('./things.js')

app.use('/things', things)

// simple middelware function
app.use('/things', function (req, res, next) {
    console.log("A new request received at " + Date.now())

    // this function call is very important. it tells that more processing is required for request and is in the next middleware function / route handler.
    next()
})

app.get('/:id', function (req, res) {
    res.send('the id you specified is ' + req.params.id)
})



app.get('*', function (req, res) {
    res.send('Sorry, this is invalid URL.')
})

app.listen(port, () => console.log('exalmple app listening at http://localhost:3000'))