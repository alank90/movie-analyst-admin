// /routes/movies.js

// Declare our dependencies
const express = require('express');
const request = require('superagent');
const getAccessToken = require('../public/lib/get_token');

var router = express.Router();

// For the movies route, we’ll call the getAccessToken middleware to get an access token from auth0.com. If we do 
// have a valid access_token, we’ll make a request with the superagent library and we’ll be sure to add our 
// access_token in an Authorization header before making the request to our API.
// Once the request is sent out, our API will validate that the access_token has the right scope to request 
// the /movies resource and if it does, will return the movie data. We’ll take this movie data, and pass it 
// alongside our movies.ejs template for rendering
router.get('/', getAccessToken, function (req, res) {
    request
        .get('http://localhost:8080/movies')
        .set('Authorization', 'Bearer ' + req.access_token)
        .end(function (err, data) {
            if (data.status == 401) {
                res.status(401).send(err);
            } else {
                const movies = data.body;
                res.render('movies', { movies: movies });
            }
        });
});

module.exports = router;

