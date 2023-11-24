const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function readIngredientsFile(filePath) {
    try {
        const ingredientsContent = fs.readFileSync(filePath, 'utf-8');
        const ingredientsArray = ingredientsContent.split('\n').map(line => line.trim());
        return ingredientsArray;
    } catch (error) {
        console.error('Error reading ingredients file:', error);
        throw error;
    }
}

const ingredientsFilePath = path.join(__dirname, '../ingredients.txt');
const ingredientsArray = readIngredientsFile(ingredientsFilePath);
console.log('Ingredients Array:', ingredientsArray);

const dbFilePath = path.join(__dirname, './recipes.db');
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        throw err;
    } else {
        console.log('Connected to the database');
    }
});

try {
    let whereConditions = ingredientsArray.map(ingredient => `AllIngredients LIKE '%${ingredient}%'`);
    let whereClause = whereConditions.join(' OR ');

    let sqlQuery = `
    SELECT Title, Category, AllIngredients,
           (${ingredientsArray.map(ingredient => `CASE WHEN AllIngredients LIKE '%${ingredient}%' THEN 1 ELSE 0 END`).join(' + ')}) AS MatchCount,
           NumIngredients - (${ingredientsArray.map(ingredient => `CASE WHEN AllIngredients LIKE '%${ingredient}%' THEN 1 ELSE 0 END`).join(' + ')}) AS MissingCount
    FROM recipes 
    WHERE ${whereClause} 
    GROUP BY Title, Category, AllIngredients
    ORDER BY MissingCount ASC, MatchCount DESC
    LIMIT 3;
`;

    // Execute the SQL query
    db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            console.error('Error running query:', err.message);
            throw err;
        }
        console.log('Query result:', rows);
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Disconnected from the database');
            }
        });
    });
} catch (error) {
    console.error('Unexpected error:', error);
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Disconnected from the database');
        }
    });
}