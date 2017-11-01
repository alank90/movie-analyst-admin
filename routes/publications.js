// Declare our dependencies
const express = require('express');
const request = require('superagent');
const getAccessToken = require('../public/lib/get_token');

var router = express.Router();

router.get('/', getAccessToken, function (req, res) {
    request
        .get('http://localhost:8080/publications')
        .set('Authorization', 'Bearer ' + req.access_token)
        .end(function (err, data) {
            if (data.status == 401) {
                res.status(401).send(err);
            } else {
                const publications = data.body;
                res.render('publications', { publications: publications });
            }
        });
});

module.exports = router;