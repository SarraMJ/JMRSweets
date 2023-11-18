// data/recipes.js

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

function searchRecipes(callback) {
    const ingredientsFilePath = '../ingredients.txt';
    const ingredientsList = fs.readFileSync(ingredientsFilePath, 'utf-8').split('\n').map(line => line.trim());

    const dbFilePath = './recipes.db';
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
        if (err) {
            // Log the error
            console.error('Error executing the query:', err);
            // Pass the error to the callback
            callback(err);
            console.log('test');
            return;
        }

        db.close();

        // Log the results for debugging
        console.log('Search results:', rows);

        // Invoke the callback with the search results
        callback(null, rows);
        console.log('test2');
    });
}

module.exports = {
    searchRecipes,
};
