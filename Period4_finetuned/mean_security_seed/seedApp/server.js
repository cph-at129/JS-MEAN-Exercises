var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var bcrypt = require('bcryptjs');
var passport = require('passport');
var passportConfig = require("./config/passport");
passportConfig(passport);
var jwt = require('jwt-simple');

var session = require('express-session');
var User = require('./models/User.js');
var Joke = require('./models/Joke.js');

var index = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/app')));
app.use(passport.initialize());

app.use('/', index);
app.use('/api', api);
app.use('/auth', authenticate);

app.use('/api', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) { res.status(403).json({ message: "Token could not be authenticated", fullError: err }) }
        if (user) { return next(); }
        return res.status(403).json({ message: "Token could not be authenticated 2", fullError: info });
    })(req, res, next);
});

//openshift ssl
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
        var tmp = 'https://' + req.headers.host + req.originalUrl;
        res.redirect(tmp);

    } else {
        return next();
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
