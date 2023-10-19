var express = require('express');
var router = express.Router();
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

//handle get 
router.get('/', function (req, res) {
    res.render('home'); 
  });


/* handle post */
router.post('/', function(req, res) {
  res.render('home');
}); 


//Handles image upload 

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Store uploaded files in the public/uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Handle file upload
router.post('/upload', upload.array('images', 10), function(req, res) {
  // `req.files` contains information about the uploaded files
  // You can access the files using req.files
  // For example, if you want to get the first uploaded file name:
  //const firstFileName = req.files[0].filename;
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

