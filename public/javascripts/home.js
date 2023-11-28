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
// manage the Back Home button
function buttonVisibility(show) {
  if (show) {
    $('#backToFormButton').show();
  } else {
    $('#backToFormButton').hide();
  }
}

function generateRecipes() {
  $.post('/search-recipes', function (data) {
    // Update the content of the recipeResults div with the received HTML data
    if (data.recipes && data.recipes.length > 0) {
      // Clear existing content before updating
      $('#recipeResults').empty();
      data.recipes.forEach(recipe => {
        // Append recipe details to the container
        $('#recipeResults').append(`
          <p>Title: ${recipe.Title}</p>
          <p>Category: ${recipe.Category}</p>
          <p>List of ingredients: ${recipe.AllIngredients}</p>
          <p>Matched Ingredients: ${recipe.MatchCount}</p>
          <p>Missing Ingredients: ${recipe.MissingCount}</p>
        `);
      });
      // Show the back to form button
      buttonVisibility(true);

      // After generating recipes, clear the content of ingredients.txt
      clearIngredientsFile();
    } else {
      // Handle case when no recipes are found
      $('#recipeResults').html('<p>No matching recipes found.</p>');
      // Hide the back to form button
      buttonVisibility(false);
    }

    // Additional logic if needed
    console.log('Results received:', data);
  }).fail(function (error) {
    // Handle errors, such as displaying an error message
    console.error('Error receiving search results:', error);
    // Hide the back to form button in case of an error
    buttonVisibility(false);
  });
}

//click on bach Home => returns to home without the recipes. 
$('#backToFormButton').on('click', function () {
  window.location.href = '/'; 
});

// Function to clear the content of ingredients.txt
function clearIngredientsFile() {
  $.ajax({
    url: '/clear-ingredients-file',
    type: 'POST',
    success: function (data) {
      console.log('Ingredients file cleared successfully!');
    },
    error: function (error) {
      console.error('Error clearing ingredients file:', error);
    }
  });
}



  //When we click "choose files" the message in "uploadMessage" div disappears (in case user wants to reupload a file)
$('input[name="images"]').on('change', function () {
  $('#uploadMessage').text('');
});
// Handle form submission
$('#uploadForm').on('submit', function (event) {
  event.preventDefault();

  var formData = new FormData($(this)[0]);
  
  // Create a deferred object
  var deferred = $.Deferred();

  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function (data) {
      $('#uploadMessage').text(data.message);
      $('#uploadForm')[0].reset();

      $.get('/run-and-clear-uploads', function (data) {
        $('#helloResult').text(data.result);
        $('#uploadMessage').text(data.message);

        // Resolve the deferred object to indicate completion
        deferred.resolve();
      });
    },
    error: function (error) {
      console.error('Error uploading files:', error);

      // Reject the deferred object in case of an error
      deferred.reject();
    },
    complete: function () {
      getSelectedIngredients();
      $('#uploadForm').hide();
    }
  });

  // Use the deferred object to wait for completion
  deferred.done(function () {
    // Now that the GET request and getSelectedIngredients are complete, call generateRecipes
    generateRecipes();
  });
});

/*
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
}); */
