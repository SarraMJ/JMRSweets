var express = require('express');
var router = express.Router();
const multer = require('multer'); //used for file uploads 
const { exec } = require('child_process'); //used for our python script
const path = require('path'); //used to get absolute paths
const fs = require('fs'); //allows file system operations to be perfomed (used to check if folder exists)


// Variable to store ingredientsArray
//let ingredientsArray = [];
ingredientsArray = require('./ingredients');
//handle get 
router.get('/', function (req, res) {
    res.render('home'); 
  });


/* handle post */
router.post('/', function(req, res) {
  res.render('home');
}); 


//Handles image upload 

const upload_directory = 'uploads';

// if uploads folder doesn't exist, creates it
if (!fs.existsSync(upload_directory)) {
  fs.mkdirSync(upload_directory);
}

// Multer configuration for file uploads (configuration destination (uploads) and filenaming)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, upload_directory); // Store uploaded files in the public/uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

//initializes multer with the configurations (we defined up)
const upload = multer({ storage: storage });

// handles post request to upload images
router.post('/upload', upload.array('images', 10), function(req, res) {
  // `req.files` : has info about the uploaded files
  // to get first uploaded file name : const firstFileName = req.files[0].filename;
  res.json({ message: 'Files uploaded successfully!' });
});

//Handles python execution 

router.get('/run-and-clear-uploads', (req, res) => {
  const scriptPath = path.join(__dirname, '../training/fruits.py');

  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Erreur : ${error}');
      return res.status(500).send('Erreur lors de l\'exécution du script Python.');
    }

    // Saves the output of python script
    //const result = stdout;

    // Parse the JSON response containing the ingredients array
    try {
      ingredientsArray = JSON.parse(stdout);
    } catch (parseError) {
      console.error('Error while parsing JSON response: ${parseError}');
      return res.status(500).send('Error while reading the JSON response.');
    }

    // Deletes content of uploads folder
    fs.readdir(upload_directory, (err, files) => {

      if (err) {
        console.error('Error while accessing uploads folder : ${err}');
        return res.status(500).send('Error while deleting files from uploads.');
      }

      files.forEach(file => {
        const filePath = path.join(upload_directory, file);
        fs.unlinkSync(filePath); //Deletes every file from uploads
      });


      res.json({ result: ingredientsArray, message: 'Images deleted successfully!' });
    });
  });
}); 

module.exports = router;

// Handles post request to submit ingredients
router.post('/submit-ingredients', function(req, res) {
  res.json({ ingredients: ingredientsArray });
});
