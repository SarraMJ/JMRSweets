// data/recipes.js

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function readIngredientsFile(filePath) {
    try {
        const ingredientsContent = fs.readFileSync(filePath, 'utf-8');
        // Divise le contenu en lignes et supprime les espaces inutiles
        const ingredientsArray = ingredientsContent.split('\n').map(line => line.trim());
        return ingredientsArray;
    } catch (error) {
        console.error('Error reading ingredients file:', error);
        throw error;
    }
}

const ingredientsFilePath = path.join(__dirname, '../ingredients.txt');
const ingredientsArray = readIngredientsFile(ingredientsFilePath);
console.log(ingredientsArray);


function searchRecipes(callback) {
    try {
        
        const dbFilePath = path.join(__dirname, './recipes.db');
        const db = new sqlite3.Database(dbFilePath);

        const placeholders = Array.from({ length: 19 }, (_, i) => `Ingredient${String(i + 1).padStart(2, '0')} LIKE ?`).join(' OR ');
        const query = `
            SELECT Title, Category, COUNT(*) AS MissingIngredients
            FROM recipes
            WHERE (${placeholders})
            AND Category IN ('Cakes', 'Pies', 'Desserts')
            GROUP BY Title, Category
            ORDER BY MissingIngredients ASC
            LIMIT 3
        `;

        const ingredientsWithWildcards = ingredientsList.map(ingredient => `%${ingredient}%`);

        db.all(query, ingredientsWithWildcards, (err, rows) => {
            db.close();

            if (err) {
                // Log the error
                console.error('Error executing the query:', err);
                // Pass the error to the callback
                callback(err);
                return;
            }

            // Log the results for debugging
            console.log('Search results:', rows);

            // Invoke the callback with the search results
            callback(null, rows);
        });
    } catch (error) {
        // Log any unexpected errors
        console.error('Unexpected error in searchRecipes:', error);
        callback(error);
    }
}

module.exports = {
    searchRecipes,
};
