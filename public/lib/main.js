// /lib/main.js

// ================ Main ============================================ 
$(document).ready(function () {
    // ========= Event Handler for Updating Movies page =============
    $("#update_button").on("click", function (e) {
        try {
            e.preventDefault();
            var updatedDocument = {};
                        
            // Let's find the data-id of the checked panel
            // We will iterate thru each .panel DOM object and check 
            // if its radiobox is checked, and if so we will go 
            // and grab the data-id value of this panel object
            $(".panel").each(function (index) {
                if ($(this).find("input[name = 'select']").is(":checked")) {
                    updatedDocument = {
                        documentID: $(this).data("id"),
                        title: $(this).find("input#name").val(),
                        release: $(this).find("input#release").val(),
                        score: $(this).find("input#score").val(),
                        reviewer: $(this).find("input#reviewer").val(),
                        publication: $(this).find("input#publication").val()
                    };
                    JSON.stringify(updatedDocument);
                } // end if
            }); // .each

            // Check if a selection was made on the page
            if (Object.keys(updatedDocument).length === 0) {
                throw "Error: Empty updateDocument Object. Did you make a selection?";
            }


            // Now we have the document stored in JSON object, so lets form 
            // an AJAX req and grab the updated data from our document and send
            // a PUT to our API endpoint
            $.ajax({
                type: 'PUT',
                data: updatedDocument,
                url: 'http://localhost:8080/movies/updatemovie/' + updatedDocument.documentID,
                dataType: 'JSON',
                success: function(response) {
                    // This is for loading effect when clinking Update button
                    // $("#update_button") is equivalent to $btn = $(this) declared 
                    // in the click event handler scope
                    const $btn = $("#update_button");
                    const movie = response;
                    $btn.button('loading');
                    setTimeout(function() {
                        // Delayed button reset and panel-title update for effect
                        $btn.button("reset");
                        $("div[data-id = " + movie[0]._id + "] .panel-title").text("Edit: " + movie[0].title);
                    }, 1750 ); // For Bootstrap 
                }
            }).done(function (response) {
                // Check for successful json response
                if (Object.keys(response).length > 0) {
                    // Update the movie panel
                    const movie = response;

                    // Write the Updated Values back to the movie form panel from API JSON return array
                    $("div[data-id = " + movie[0]._id + "] input#name.form-control").attr("value", movie[0].title);
                    $("div[data-id = " + movie[0]._id + "] input#release.form-control").attr("value", movie[0].release);
                    $("div[data-id = " + movie[0]._id + "] input#score.form-control").attr("value", movie[0].score);
                    $("div[data-id = " + movie[0]._id + "] input#reviewer.form-control").attr("value", movie[0].reviewer);
                    $("div[data-id = " + movie[0]._id + "] input#publication.form-control").attr("value", movie[0].publication);
                }
                else {
                    alert('Error: ' + response.msg);
                }
            
            }); // end .done
        } // end try
        catch (error) {
            alert(error);
        }

    });  // =========== End #update_button  event handler =========================


    // ==== Event handler for Add New Movie Modal on movies page ==================
    $('#form').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            // Do nothing. There was an error. This is required for validator() to work
        } else {
            e.preventDefault();
            $.ajax({
                method: "POST",
                data: $('#form').serializeArray(),
                url: "http://localhost:8080/movies/addmovie",
                dataType: "JSON"
            })
                .then(function (response) {
                    $('#addReviewModal').modal('hide');
                    if (addMovie(response)) {
                        // Do nothing if return true
                    } else {
                        throw "Movie object passed to addMovie is empty.";
                    }
                })
                .catch(function (error) {
                    $('#addReviewModal').modal('hide');
                });

        } // end else

    }); // end #form event handler

    // =============== Clear Fields on Add Movie Form ============================================
    $("#clear_form").on("click", function(e) {
        $('#form')[0].reset(); 
    });
    // ============ End Clear Form ===================================================

    // ==== Event handler to Delete Movie document on movies page ==================
    $("#delete_button").on("click", function (e) {
        try {
            e.preventDefault();
            var deleteDocumentID;
            var selectionCounter = 0;

            $(".panel").each(function (index) {
                if ($(this).find("input[name = 'select']").is(":checked")) {
                    deleteDocumentID = $(this).data("id");
                    selectionCounter += 1;
                }
            }); // .each

            // Check if a selection was made on the page and confirm.
            if (selectionCounter === 0) {
                throw "Error. No Selection Made.";
            }
            const confirmDelete = confirm("Are you sure you want to delete document?");
            if (confirmDelete == true) //do nothing

                // Let's Send off the ID to be deleted to the Movie-Analyst API via AJAX
                $.ajax({
                    method: 'DELETE',
                    url: 'http://localhost:8080/movies/deletemovie/' + deleteDocumentID,
                    dataType: "text"
                })
                    .then(function (response) {
                        if (deleteMovie(response)) {
                            // Do nothing if return true
                        } else {
                            throw "Invalid movieID submitted to deleteMovie.";
                        }
                    })
                    .catch(function (error) {
                        alert("Error: Delete Failed. The AJAX promise was rejected." + error);
                    });

        }
        catch (error) {
            alert(error);
        }

    }); // end.on


    // ================ End Event Handler ==========================================

    
}); // end $(document).ready()