// renderPanel.js 
 const deleteMovie = function (movieID) {
    if( movieID != "") {
        deleteMoviePanel = $("div[data-id=" + movieID + "]");
        deleteMoviePanel.parent(".col-sm-4").remove();

        return true;
    } else {
        return false;
    }
};

const addMovie = function(movie) {
    console.log(movie);
    var moviePanel = "";
    // Append the new Movie Panel
    if(movie != "") {
        moviePanel += "<div class='col-sm-4'> <div class='panel' data-id='" + movie[0]._id + "'>";
        moviePanel += "<div class='panel-heading'><h3 class='panel-title'>Edit:" + movie[0].title;
        moviePanel += "</h3><div class='radio'><input type='radio' name='select'><label id='select'>Select</label></div></div><!-- panel-heading --><div class='panel-body text-center'>";
        moviePanel += "<label for='name'>Name</label><input id='name' type='text' class='form-control' value='" + movie[0].title + "' class='form-control'>";
        moviePanel += "<label for='release'>Release</label> <input id='release' type='text' value='" + movie[0].release + "' class='form-control'>";
        moviePanel += "<label for='score'>Score</label> <input id='score' type='text' value='" + movie[0].score + "' class='form-control'>";
        moviePanel += "<label for='reviewer'>Reviewer</label> <input id='reviewer' type='text' value='" + movie[0].reviewer + "' class='form-control'>";
        moviePanel += "<label for='publication'>Publication</label> <input id='publication' type='text' value='" + movie[0].publication + "' class='form-control'>";
        moviePanel += "</div></div></div>";
        return true;
    } else {
        return false;
    }
   
       // Append the panel to the main div
    $("#movie_panels").append(moviePanel);
    
};
