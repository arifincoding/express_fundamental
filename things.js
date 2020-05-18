var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('hello ipin-san')
})

router.get('/hello', function (req, res) {
    res.send('coba hello')
})

router.post('/hello', function (req, res) {
    res.send('you just called the post method')
})

router.get('/:name/:id', function (req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name)
})

router.get('/:id([0-9]{5})', function (req, res) {
    res.send('id: ' + req.params.id)
})

module.exports = router