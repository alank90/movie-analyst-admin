// Declare our dependencies
const express = require('express');
const request = require('superagent');
const getAccessToken = require('../public/lib/get_token');

var router = express.Router();

router.get('/', getAccessToken, function (req, res) {
    request
        .get('http://localhost:8080/pending')
        .set('Authorization', 'Bearer ' + req.access_token)
        .end(function (err, data) {
            if (data.status == 401) {
                res.status(401).send(err);
            } else {
                const movies = data.body;
                res.render('pending', { movies: movies });
            }
        });
}); 

module.exports = router;