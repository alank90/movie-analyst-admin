// server.js

// Declare our dependencies
const express = require('express');
const request = require('superagent');

// create the express app
const app = express();

// Import API Routes
const movies_route = require('./routes/movies');
const authors_route = require('./routes/authors');
const publications_route = require('./routes/publications');
const pending_route = require('./routes/pending');


// Set the view engine to use EJS as well as set the default views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');

// This tells Express out of which directory to serve static assets like CSS and images
app.use(express.static(__dirname + '/public'));

// ===================================================================================================
// ============= Middlware Below This Line =========================================================== 
// ===================================================================================================

// Use the Middleware from /routes
app.use('/movies', movies_route);
app.use('/authors', authors_route);
app.use('/publications', publications_route);
app.use('/pending', pending_route);

// ================================================================================================
// ============= Routes Below This Line =========================================================== 
// ================================================================================================

// The homepage route of our application does not interface with the MovieAnalyst API and is always accessible. 
// We won’t use the getAccessToken middleware here. We’ll simply render the index.ejs view.
app.get('/', function (req, res) {
    res.render('index');
});

// Our MovieAnalyst Admin Website will listen on port 4000. Feel free to change this as you see fit, just know that you can’t
// have multiple processes listening on the same port.
app.listen(4000, function () {
    console.log('Movie-Analyst-Admin Web App listening on port 4000');
});