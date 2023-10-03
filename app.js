//Importe les modules utilisé pour build and configure express.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var fileUpload = require('express-fileupload');

//indludes route files to handle routes either in index or users
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');

//créé une instance de express qu'on va utilisé pr définir les routes
var app = express();

// view engine setup : we use pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', homeRouter);


//middleware
app.use(logger('dev')); //stocke les infos sur tous les https requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation de express-fileupload pour gérer le téléchargement de fichiers
app.use(fileUpload());

app.use(express.static('public'));
app.get('/',(req,res)=>{
  res.render('header');
});
app.get('/', (req, res) => {
  res.render('home');
});
//routing
//app.use('/', indexRouter);
//app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware pour servir les fichiers statiques (comme les images téléchargées)
app.use(express.static('uploads'));
/*
// Page d'accueil
app.get('/', (req, res) => {
  res.render('upload');
});  il ya deja avec home notre page d'acceuill*/

// Gestion de l'envoi de fichiers
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    // Le fichier a été téléchargé avec succès
    res.send('Image téléchargée avec succès.');
  } else {
    // Aucun fichier n'a été sélectionné
    res.send('Aucun fichier sélectionné.');
  }
});
