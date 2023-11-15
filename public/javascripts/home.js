//ingredientsArray = require('../routes/ingredients');
let ingredientsArray = [];
$(function () {

  //When we click "choose files" the message in "uploadMessage" div disappears (in case user wants to reupload a file)
  $('input[name="images"]').on('change', function () {
    $('#uploadMessage').text('');
  });

  // Handle form submission
  $('#uploadForm').on('submit', function (event) {
    event.preventDefault(); // Prevents form from submitting in the traditional way

    var formData = new FormData($(this)[0]);  // Create FormData object to send files 
    // constructs a set of key/value pairs representing form fields and their values, here = collects the data from the selected files
    $.ajax({
      url: '/upload', //where request will be sent
      type: 'POST',
      data: formData, //what= our uploaded files 
      contentType: false, // Don't set content type (it will be automatically set) because jquery does it
      processData: false,  // Don't process the data (it will be automatically processed) because jquery does it
      success: function (data) {
        // Shows the success message + resets form to upload new images if needed
        $('#uploadMessage').text(data.message);
        $('#uploadForm')[0].reset();
      },
      error: function (error) {
        console.error('Error uploading files:', error);
      }

    });
  });

  //  Python part
  $('#executeFruitsButton').on('click', function () {
    $.get('/run-and-clear-uploads', function (data) {
      $('#helloResult').text(data.result);
      $('#uploadMessage').text(data.message);
    });
  });

  ///////////////////////////////////////////////
  function getSelectedIngredients() {
    // Get all checkboxes with name "ingredients"
    var checkboxes = $('input[name="ingredients"]:checked');

    // Extract values of selected checkboxes and store them in an array
    var selectedIngredients = checkboxes.map(function() {
      return this.value;
    }).get();

    

    // Add the selectedIngredients to ingredientsArray
   
    ingredientsArray = ingredientsArray.concat(selectedIngredients);

    // Log or use the updated ingredientsArray as needed
    console.log(ingredientsArray);
  }


  // Add click event listener for the Submit Ingredients button
  $('#submitIngredientsButton').on('click', function() {
    getSelectedIngredients();

    // Send a POST request to submit ingredients
    $.post('/submit-ingredients', { ingredients: ingredientsArray }, function(data) {
      console.log('Ingredients submitted:', data.ingredients);
    });
  });

});


