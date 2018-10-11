const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const config = require('./config/config');
const View = require('./core/View');

const app = express();
const theme = config && config.theme || 'hana';

// view engine setup
app.set('views', path.join(__dirname, 'themes/' + theme + '/jade'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'HANA-2012-HanaSecretGarden',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'themes/' + theme + '/static')));
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    const v = new View();
    v.render('error', res);
});

module.exports = app;
