var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieSession = require('cookie-session');
var staticRoute = require('express-static');

var index = require('./routes/index');
var users = require('./routes/users');
var Info = require('./routes/Info');
var classroom = require('./routes/classroom');

var app = express();

//本来用于跨域的
/*app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Content-Type', 'Authorization']
}));*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//用于加密session
var arr = [];
for(var i = 0;i < 100000;i ++){
  arr.push('sig_' + Math.random());
}

//设置cookie
app.use(cookieParser('ltlt'));

//设置session
app.use(cookieSession({
  keys: arr,
  maxAge: 30 * 60 * 1000,    //session时长30分钟
  resave: true,       //强制将session保存到session store中
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/Info', Info);
app.use('/class', classroom);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
