var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');



var itemRouter = require('./routes/items');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({
  origin: 'https://pavan-assessment-frontend.onrender.com', // Replace with your React app's URL
  credentials: true,
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/items', itemRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect("mongodb+srv://karriku03:tSJAzAGBop4wReGK@cluster0.mlfuc2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => console.log("DB connection successful"))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
