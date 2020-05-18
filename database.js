var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()
var app = express()
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_db')

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
})

var Person = mongoose.model("wedos", personSchema)

app.set('view engine', 'pug')
app.set('views', './views')

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({
    extended: true
}))
// form-urlencoded

// for parsing multipart/form-date
app.use(upload.array())

app.get('/person', function (req, res) {
    res.render('person')
})

app.post('/person', function (req, res) {
    var personInfo = req.body //get the parsed information

    if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            massage: "sorry, you provided wrong info",
            type: "error"
        })
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        })

        newPerson.save(function (err, Person) {
            if (err) {
                res.render('show_message', {
                    massage: "Database error",
                    type: "error"
                })
            } else {
                res.render('show_message', {
                    message: "New person added",
                    type: "success",
                    person: personInfo
                })
            }
        })
    }
})
// showing all document
Person.find(function (err, response) {
    console.log(response)
})

// finding document
Person.find({
        name: "karl",
        age: 20
    },
    function (err, response) {
        console.log(response)
    }
)

// finding document just display name
Person.find({
        name: "karl",
        age: 20
    }, "name",
    function (err, response) {
        console.log(response)
    }
)

// fingding documet by id
Person.findById("5e9c19118a67bd4130ee9956", function (err, response) {
    console.log(response)
})

// show document
app.get('/persondata', function (req, res) {
    Person.find(function (err, response) {
        res.json(response)
    })
})

// updating document
// Person.update({
//     age: 20
// }, {
//     name: "wumbo"
// }, function (err, response) {
//     console.log(response)
// })


app.put('/people/:id', function (req, res) {
    Person.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if (err) {
            res.json({
                message: "Error in updating person with id " + req.params.id
            })
        } else {
            res.json(response)
        }
    })
})

// delete document
app.delete('/remove/:id', function (req, res) {
    Person.findByIdAndRemove(req.params.id, function (err, response) {
        if (err) {
            res.json({
                message: "Error in deleting record id " + req.params.id
            })
        } else {
            res.json({
                message: "Person with id " + req.params.id + " removed."
            })
        }
    })
})

app.listen(3000)