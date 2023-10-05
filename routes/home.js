var express = require('express');
var router = express.Router();

//handle get 
router.get('/', function (req, res) {
    res.render('home'); 
  });


/* POST home page, (upload pic) */
router.post('/', function(req, res) {
  res.render('home');
}); 

module.exports = router;

/* chatgpt example
// routes/home.js

const express = require('express');
const router = express.Router();

// This route handles the POST request for uploading an image and generating recipes
router.post('/upload', (req, res) => {
  // Here, you would handle the image upload and recipe generation logic
  // For simplicity, let's assume you receive a list of ingredients as JSON in the request body

  const uploadedIngredients = req.body.ingredients;

  // Perform recipe generation logic here
  const generatedRecipes = generateRecipes(uploadedIngredients);

  // Send back the generated recipes as a JSON response
  res.json({ recipes: generatedRecipes });
});

// Example function for generating recipes (replace with your actual logic)
function generateRecipes(ingredients) {
  // Simulate generating recipes based on the ingredients
  // Replace this with your actual recipe generation logic
  const recipes = [];

  // Example: Generating a random recipe for each ingredient
  ingredients.forEach((ingredient) => {
    recipes.push({
      ingredient,
      recipe: `Recipe for ${ingredient}`,
    });
  });

  return recipes;
}

module.exports = router;
*/ 