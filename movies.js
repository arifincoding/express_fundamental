var express = require('express');
var router = express.Router();

var movies = [{
        id: 101,
        name: "fake",
        year: 1999,
        rating: 8.1
    },
    {
        id: 102,
        name: "different",
        year: 2010,
        rating: 6.9
    },
    {
        id: 103,
        name: "dream",
        year: 1971,
        rating: 9.0
    },
    {
        id: 104,
        name: "hello",
        year: 2008,
        rating: 7.6
    }
];

// routes will go here
module.exports = router;

router.get('/', function (req, res) {
    res.json(movies);
});

// get route
router.get('/:id([0-9]{3})', function (req, res) {
    var currMovie = movies.filter(function (movie) {
        if (movie.id == req.params.id) {
            return true;
        }
    });
    if (currMovie.length == 1) {
        res.json(currMovie[0])
    } else {
        res.status(404); //Set status yo 404 as movie was not found
        res.json({
            message: "Not Found"
        });
    }
});

// post route
router.post('/', function (req, res) {
    // check if all field are provided and are valid
    if (!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {

        res.status(400);
        res.json({
            message: "Bad Request"
        });
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.json({
            message: "New movie created.",
            location: "/movies/" + newId
        });
    }
});

// put route
router.put('/:id', function (req, res) {
    // check if all field are provided and are valid:
    if (!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) || !req.params.id.toString().match(/^[0-9]{3}$/g)) {

        res.status(400);
        res.json({
            message: "bad Request"
        });
    } else {
        // gets up the index of movie with given id.
        var updateIndex = movies.map(function (movie) {
            return movie.id;
        }).indexOf(parseInt(req.params.id));

        if (updateIndex === -1) {
            // movie not found, create new
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({
                message: "new movie created",
                location: "/movies/" + req.params.id
            });
        } else {
            // update existing movie
            movies[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            }
            res.json({
                message: "Movie id " + req.params.id + " Updated.",
                location: "/movies/" + req.params.id
            });
        }
    }
});

// delete route
router.delete('/:id', function (req, res) {
    var removeIndex = movies.map(function (movie) {
        return movie.id;
    }).indexOf(parseInt(req.params.id)); //gets us the index of movie with given id

    if (removeIndex === -1) {
        res.json({
            message: "Not found"
        });
    } else {
        movies.splice(removeIndex, 1);
        res.send({
            message: "Movie id " + req.params.id + "removed."
        });
    }
});