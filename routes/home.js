var express = require('express');
var router = express.Router();
const multer = require('multer'); //used for file uploads 
const { exec } = require('child_process'); //used for our python script
const path = require('path'); //used to get absolute paths
const fs = require('fs'); //allows file system operations to be perfomed (used to check if folder exists)

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

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, upload_directory); // Store uploaded files in the public/uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Handle file upload
router.post('/upload', upload.array('images', 10), function(req, res) {
  // `req.files` : has info about the uploaded files
  // to get first uploaded file name : const firstFileName = req.files[0].filename;
  res.json({ message: 'Files uploaded successfully!' });
});

//Handles python execution 
router.get('/run-hello', (req, res) => {
  // constructs the absolut path to fruits.py 
  const scriptPath = path.join(__dirname, '../training/fruits.py');

  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur : ${error}`);
      return res.status(500).send('Erreur lors de l\'exécution du script Python.');
    }

    // sends the output of the python script as json response (to make it appear on the page)
    res.json({ result: stdout });
  });
});


module.exports = router;

