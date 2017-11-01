// Declare our dependencies
const express = require('express');
const request = require('superagent');


// These two variables we’ll get from our Auth0 MovieAnalyst-Website Client.
// Head over the the management dashboard at https://manage.auth0.com
// Find the MovieAnalyst Website Client and copy and paste the Client ID and Secret
const NON_INTERACTIVE_CLIENT_ID = 'dDaFd6kxSVohuUzgUVgQt70jwudxHvee';
const NON_INTERACTIVE_CLIENT_SECRET = '2FJDqQ8EFp8VY-Oeew2ICkxnDVT1_3aMtBeTX3Rg3O38GbJ5bkeOiRMK0ZaAnqbC';

// Next, we’ll define an object that we’ll use to exchange our credentials for an access token.
const authData = {
    client_id: NON_INTERACTIVE_CLIENT_ID,
    client_secret: NON_INTERACTIVE_CLIENT_SECRET,
    grant_type: 'client_credentials',
    audience: 'movieanalyst'
};

// We’ll create a middleware to make a request to the oauth/token Auth0 API with our authData we created earlier.
// Our data will be validated and if everything is correct, we’ll get back an access token.
// We’ll store this token in the req.access_token variable and continue the request execution.
// It may be repetitive to call this endpoint each time and not very performant, so you can cache the access_token once it is received.
const  getAccessToken = function getAccessToken(req, res, next) {
    request
        .post('https://movieapi.auth0.com/oauth/token')
        .send(authData)
        .end(function (err, res) {
            req.access_token = res.body.access_token;
            next();
        });
};

module.exports = getAccessToken;
