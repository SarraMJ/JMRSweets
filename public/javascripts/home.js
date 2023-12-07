function writeIngredients(ingredient) {
  console.log('Sending ingredient to server:', ingredient);

  // Sends the ingredient to the server
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
  // Gets all checkboxes with name "ingredients"
  var checkboxes = $('input[name="ingredients"]:checked');

  // Logs the number of checkboxes and their values
  console.log('Number of checkboxes:', checkboxes.length);

  // Extracts the values of selected checkboxes and store them in an array
  var selectedIngredients = checkboxes.map(function () {
    return this.value;
  }).get();

  console.log('Selected ingredients:', selectedIngredients);

  // Writes each selected ingredient to the server
  selectedIngredients.forEach(writeIngredients);
}

// manages the display of Back Home button
function buttonVisibility(show) {
  if (show) {
    $('#backToFormButton').show();
  } else {
    $('#backToFormButton').hide();
  }
}

function generateRecipes() {
  $.post('/search-recipes', function (data) {
    // Updates the content of the recipeResults div with the received  data
    
    if (data.recipes && data.recipes.length > 0) {
      // Clears existing content before updating
      $('#recipeResults').empty();
      
      data.recipes.forEach(recipe => {
        // Appends recipe details to the container
        const ingredientsArray = recipe.AllRecipe.split(' ; ').filter(Boolean);

        // Creates a formatted list of ingredients
        const formattedIngredients = ingredientsArray.map(ingredient => `<li>${ingredient}</li>`).join('');

        const directionsArray = recipe.Directions.split('. ').filter(Boolean);

        // Creates a formatted list of ingredients
        const formatteddirections = directionsArray.map(direction => `<li>${direction}</li>`).join('');

        $('#recipeResults').append(`
          <h2> ${recipe.Title}</h2>
          <h5>Category: ${recipe.Category}</h5>
          <p>Number of matched Ingredients: ${recipe.MatchCount}</p>
          <p>Missing Ingredients: ${recipe.MissingCount}</p>
          <p>Ingredients:</p>
          <ul>${formattedIngredients}</ul>          
          <p>Directions:  
          <ol>
          ${formatteddirections}
          </ol>
          </p>
        `);
      });
      // Show the back to form button
      buttonVisibility(true);

      // After generating recipes, clear the content of ingredients.txt
      clearIngredientsFile();
    } else {
      // Handle case when no recipes are found
      $('#recipeResults').append('<p>No matching recipes found.</p>');
      // Hide the back to form button
      buttonVisibility(true);
    }

    // Additional logic if needed
    console.log('Results received:', data);
  }).fail(function (error) {
    // Handle errors, such as displaying an error message
    console.error('Error receiving search results:', error);
    $('#recipeResults').append('<p>No matching recipes found.</p>');
      // Hide the back to form button
      buttonVisibility(true);
    // Hide the back to form button in case of an error
    //buttonVisibility(false);
  });
}

//click on back Home => returns to home page with form  
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
// Handles form submission
$('#uploadForm').on('submit', function (event) {
  event.preventDefault();

  var formData = new FormData($(this)[0]);
  
  // Creates a deferred object
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
        $('#uploadMessage').text(data.message);

        // Resolve the deferred object to indicate completion
        deferred.resolve();
      });
    },
    error: function (error) {
      console.error('Error uploading files:', error);

      // Reject the deferred object in case of an error
      deferred.reject();
    }
  });

  getSelectedIngredients();
      $('#uploadForm').hide();

  //deferred object used to wait for completion
  deferred.done(function () {
    // Now that everything is completed, calls generateRecipes
    generateRecipes();
  });
});

