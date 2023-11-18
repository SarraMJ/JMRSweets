

function writeIngredients(ingredient) {
  console.log('Sending ingredient to server:', ingredient);

  // Send the ingredient to the server
  $.ajax({
    url: '/submit-ingredients',
    type: 'POST',
    data: JSON.stringify({ ingredients: [ingredient] }),
    contentType: 'application/json',
    success: function (data) {
      console.log(`"${ingredient}" has been sent to the server successfully!`);
    },
    error: function (error) {
      console.error('Error sending ingredient to server:', error);
    },
    complete: function () {
      console.log('AJAX request complete for ingredient:', ingredient);
    }
  });
}


function getSelectedIngredients() {
  // Get all checkboxes with name "ingredients"
  var checkboxes = $('input[name="ingredients"]:checked');

  // Log the number of checkboxes and their values
  console.log('Number of checkboxes:', checkboxes.length);

  // Extract values of selected checkboxes and store them in an array
  var selectedIngredients = checkboxes.map(function () {
    return this.value;
  }).get();

  // Log or use the updated ingredientsArray as needed
  console.log('Selected ingredients:', selectedIngredients);

  // Write each selected ingredient to the server
  selectedIngredients.forEach(writeIngredients);
}



  //When we click "choose files" the message in "uploadMessage" div disappears (in case user wants to reupload a file)
$('input[name="images"]').on('change', function () {
  $('#uploadMessage').text('');
});

 // Handle form submission
$('#uploadForm').on('submit', function (event) {
  event.preventDefault(); // Prevents form from submitting in the traditional way

  // Upload images
  var formData = new FormData($(this)[0]);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function (data) {
      $('#uploadMessage').text(data.message);
      $('#uploadForm')[0].reset();

      // Execute Python script
      $.get('/run-and-clear-uploads', function (data) {
        $('#helloResult').text(data.result);
        $('#uploadMessage').text(data.message);

        
      });
    },
    error: function (error) {
      console.error('Error uploading files:', error);

    }
  });
  getSelectedIngredients();
});

// Assuming you have a button with id 'generateRecipes' in your 'home.pug'
$('#generateRecipes').on('click', function () {
  $.post('/search-recipes', function (data) {
    // Update the content of the recipeResults div with the received HTML data
    $('#recipeResults').html(data);

    // Additional logic if needed
    console.log('Results received:', data);
  }).fail(function (error) {
    // Handle errors, such as displaying an error message
    console.error('Error receiving search results:', error);
  });
});
