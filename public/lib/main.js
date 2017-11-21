// main.js

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
    }
    catch(error) {
       alert(error);
    }

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
        .then(function(response) { 
            if(addMovie(response)) {
                // Do nothing if return true
            } else {
                throw "Error: Return from API is empty.";
            }
        });
        $('#addReviewModal').modal('hide');      
    }); // end event handler

    // ==== Event handler to Delete Movie document on movies page ==================
    $("#delete_button").on("click", function(e) {
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
            .then(function(response) {
                   if(deleteMovie(response)) {
                      // Do nothing if return true
                   } else {
                       throw "Error: Return from API is empty.";
                   }  
            });
        }
        catch(error) {
           alert(error);
        }
            
    }); // end.on

    
    // ================ End Event Handler ==========================================

    }); // end $(document).ready()