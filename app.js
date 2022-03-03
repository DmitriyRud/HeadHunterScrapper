require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scrapRouter = require('./routes/scrap');

var app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'sdgf4fg3568gdlkjlksdjfglk345',
    saveUninitialized: false,
    cookie: { secure: false }, // не HTTPS
    name: 'HHScrappCookie', // имя сессионной куки
    store: new FileStore(), // хранилище для куков - папка с файлами
    resave: false,
  })
);

app.use((req, res, next) => {
  // записываем в locals данные из сессии чтобы они были доступны в hbs
  res.locals.userId = req.session?.userId;
  if (req.session) {
    res.locals.userName = req.session.userName;
  }
  //console.log({ locals: res.locals, session: req.session });
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/scrap', scrapRouter);

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

app.listen(PORT, HOST, function () {
  console.log(`Server listens http://${HOST}:${PORT}`)
});
