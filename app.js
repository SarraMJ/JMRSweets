//Importe les modules utilisé pour build and configure express.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//indludes route files to handle routes either in index or users
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');

//créé une instance de express qu'on va utilisé pr définir les routes
var app = express();

// view engine setup : we use pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(logger('dev')); //stocke les infos sur tous les https requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.get('/',(req,res)=>{
  res.render('header');
});

//routing
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/', homeRouter);


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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
