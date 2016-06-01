var express = require('express');
var router = express.Router();
var Joke = require('../model/fakeDB');

/* GET all jokes */
router.get('/jokes', function (req, res, next) {
  var jokes = Joke.getJokes();
  res.json({ jokes: jokes });
});

/* Get joke by id */
router.get('/joke/:id', function(req, res, next){
  var jokeId = req.params.id;
  var joke = Joke.getJoke(jokeId);
  res.json({joke: joke});
});

/* Get random joke */
router.get('/joke', function (req, res, next) {
  var joke = Joke.getRandomJoke();
  res.json({ joke: joke });
});

/* Create a joke */
router.post('/joke', function(req, res, next){
   var newJoke = req.body.joke;
   Joke.addJoke(newJoke);
   var jokes = Joke.getJokes(); 
   res.json({ jokes: jokes });
});

/* Edit a joke */
router.put('/joke/:id', function(req, res, next){
   var jokeId = req.params.id;
   var editedJoke = req.body.joke;
   Joke.editJoke(jokeId, editedJoke);
   var jokes = Joke.getJokes();
   res.json({ jokes: jokes });
});

/* Delete a joke */
router.delete('joke/:id', function(req, res, next){
  var jokeId = req.params.id;
  Joke.deleteJoke(jokeId);
  var jokes = Joke.getJokes();
  res.json({ jokes: jokes });
});



module.exports = router;