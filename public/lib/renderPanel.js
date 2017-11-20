// renderMoviePanel.js 
 const deleteMovie = function (movieID) {
    if( movieID != "") {
        console.log("Im in IF renderPAnel");
        deleteMoviePanel = $("div[data-id=" + movieID + "]");
        deleteMoviePanel.parent(".col-sm-4").remove();

        return true;
    } else {
        return false;
    }
};

