var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/users/*', (req, res, next) => {
  if (req.cookies.isLogin == 1) {
    next()
  } else {
    res.redirect('/login')
  }
})
app.all('/product/*', (req, res, next) => {
  if (req.cookies.isLogin == 1) {
    next()
  } else {
    res.redirect('/login')
  }
})
app.all('/cart/*', (req, res, next) => {
  if (req.cookies.isLogin == 1) {
    next()
  } else {
    res.redirect('/login')
  }
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);

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

module.exports = app;
