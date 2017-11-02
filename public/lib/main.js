// Main Javascript File
$(document).ready(function () {
    $("#update_button").on("click", function(e) {
        e.preventDefault();
        
        // Let's find the data-id of the checked panel
        // We will iterate thru each panel DOM object and check 
        // if its radiobox is checked, and if so we will go 
        // and grab the data-id value of this panel object
        $(".panel").each(function( index ) {
            if ($(this).find("input[name = 'update']").is(":checked")) {
                const updatedDocument = {
                    documentID: $(this).data("id"),
                    name: $(this).find("input#name").val(),
                    release: $(this).find("input#release").val(),
                    score: $(this).find("input#score").val(),
                    reviewer: $(this).find("input#reviewer").val(),
                    publication: $(this).find("input#publication").val()
                };
                JSON.stringify(updatedDocument);
                console.log("Movie Document is: " + updatedDocument.release);
            }
        }); // .each

        // Now we have the document stored in JSON object, so lets form 
        // an AJAX req and grab the updated data from our document and send
        // a PUT to our API endpoint


    });  // #update_button

}); // end $(document).ready()