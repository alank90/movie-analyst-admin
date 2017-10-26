// Declare our dependencies
const express = require('express');
const request = require('superagent');
const getAccessToken = require('../get_token');

var router = express.Router();

// The process will be the same for the remaining routes. We’ll make sure to get the acess_token first and then make the request to our 
// API to get the data.The key difference on the authors route, is that for our client, we’re naming the route /authors, but our API 
// endpoint is /reviewers. Our route on the client does not have to match the API endpoint route.
router.get('/', getAccessToken, function (req, res) {
    request
        .get('http://localhost:8080/reviewers')
        .set('Authorization', 'Bearer ' + req.access_token)
        .end(function (err, data) {
            if (data.status == 401) {
                res.status(401).send(err);
            } else {
                const authors = data.body;
                res.render('authors', { authors: authors });
            }
        });
});

module.exports = router;