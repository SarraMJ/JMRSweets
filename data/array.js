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
const ingredientsList = readIngredientsFile(ingredientsFilePath);
console.log(ingredientsList);
