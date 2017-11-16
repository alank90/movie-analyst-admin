// main.js

// ================ Main ============================================ 
$(document).ready(function () {
    // ========= Event Handler for Updating Movies page =============
    $("#update_button").on("click", function (e) {
        e.preventDefault();
        var updatedDocument = {};

        // Let's find the data-id of the checked panel
        // We will iterate thru each .panel DOM object and check 
        // if its radiobox is checked, and if so we will go 
        // and grab the data-id value of this panel object
        $(".panel").each(function (index) {
            if ($(this).find("input[name = 'update']").is(":checked")) {
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

        // Now we have the document stored in JSON object, so lets form 
        // an AJAX req and grab the updated data from our document and send
        // a PUT to our API endpoint
        $.ajax({
            type: 'PUT',
            data: updatedDocument,
            url: 'http://localhost:8080/movies/updatemovie/' + updatedDocument.documentID,
            dataType: 'JSON'
        }).done(function (response) {
             // Check for successful json response
            if (Object.keys(response).length > 0) {
                // Update the movie panel
                const movie = response;
                
                // Write the Updated Values back to the movie form panel from API JSON return array
                $("div[data-id = " + movie[0]._id + "] .panel-title").text("Edit: " + movie[0].title);
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

    });  // =========== End #update_button  event handler =========================


    // ==== Event handler for Add New Movie Modal on movies page ==================
    $("#add_movie").on("click", function(e) {
        e.preventDefault();
       
        $.ajax({
            method: 'POST',
            data: $("#form").serializeArray(),
            url: 'http://localhost:8080/movies/addmovie',
            dataType: 'JSON'
        })
        .done(function(response) {
            $('#addReviewModal').modal('hide'); // close modal
           
            /* Refresh page with a call to this site's(admin) /movies route.
             .load places the returned HTML into the matched element.
             .load allows us to specify a portion of the remote document to 
             be inserted(#movie_panels). */
            $( "#movie_panels").load( '/movies #movie_panels' );      
        });
    }); // end event handler

    // ==== Event handler to Delete Movie document on movies page ==================
    $("#delete_button").on("click", function(e) {
        e.preventDefault();
        var deleteDocumentID;

        $(".panel").each(function (index) {
            if ($(this).find("input[name = 'delete']").is(":checked")) {
                    deleteDocumentID = $(this).data("id");
            } else {
                alert("Attention. No Delete Selection Made.");
            }
        }); // .each

        // Let's Send off the ID to be deleted to the Movie-Analyst API via AJAX
       $.ajax({
            method: 'DELETE',
            url: 'http://localhost:8080/movies/deletemovie/' + deleteDocumentID,
            dataType: 'JSON'
        })
        .done(function(response) {
             /* Refresh page with a call to this site's(admin) /movies route.
             .load places the returned HTML into the matched element.
             .load allows us to specify a portion of the remote document to 
             be inserted(#movie_panels). */
            $( "#movie_panels").load('/movies #movie_panels');      
        });
            
    }); // end.on

    // ================ End Event Handler ==========================================

    }); // end $(document).ready()