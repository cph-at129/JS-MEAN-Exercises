var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// make sure every joke is more than 5 characters
function validator (val) {
    return val.length > 5;
}    
    
var JokeSchema = new Schema({
    jokeText: {
        type: String,
        validate: validator
    },
    created_by: String, //should be changed to ObjectId, ref "User"	
    created_at: { type: Date},
    lastEdited: { type: Date, default: Date.now }
});

mongoose.model('Joke', JokeSchema);