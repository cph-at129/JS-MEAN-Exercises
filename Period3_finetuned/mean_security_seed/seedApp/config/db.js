var mongoose = require('mongoose');

var _connect = function(url, done) {
    mongoose.connect(url);
    done();
}

var _get = function() {
    return mongoose.connection;
}

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

module.exports.connect = _connect;
module.exports.get = _get;