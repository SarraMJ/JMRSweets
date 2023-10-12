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




const { exec } = require('child_process');
const path = require('path'); // Importez le module 'path'

router.get('/run-hello', (req, res) => {
  // Construisez le chemin absolu vers hello.py en utilisant path.join()
  const scriptPath = path.join(__dirname, '../training/fruits.py');

  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur : ${error}`);
      return res.status(500).send('Erreur lors de l\'exécution du script Python.');
    }

    // Envoyez la sortie du script Python comme réponse JSON
    res.json({ result: stdout });
  });
});

