const createError     = require('http-errors');
const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');
const errorHandler    = require('./middleware/handleErrors'); //Handle errors
const {NotFound}      = require('./utils/error');  //Create error types

const indexRouter     = require('./routes/index');
const usersRouter     = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use('**',function(req, res, next) {
  next(new NotFound('Page Not Found'))
});

// Error handler
app.use(errorHandler);

module.exports = app;
