var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Types.ObjectId;

var _connect = function (url, done){
    mongoose.connect(url);
    done();
}

var _get = function (){
    return mongoose.connection;
}

var jokeSchema = mongoose.Schema({
    joke: {
      type: String,
      required: true,
    },
    jokeType: [],
    reference: {
      author: String, 
      link: String
    },
    lastEdited: {
      type: Date,
      default: Date.now
    }
});

jokeSchema.path('joke').validate(function(v){
    return v.length >= 5; 
}, 'The joke length must be minimum 5 characters!');


var JokeModel = mongoose.model('JokeModel', jokeSchema);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected');
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

module.exports.connect = _connect;
module.exports.get = _get;
module.exports.JokeModel = JokeModel;
module.exports.ObjectId = ObjectId;