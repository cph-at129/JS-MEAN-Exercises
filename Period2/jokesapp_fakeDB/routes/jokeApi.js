var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");

var jokeCount = 0;
var jokesCount = 0;
var storeJoke = 0;

router.get('/', function(req, res, next){
	res.render('jokesApi');
})

router.get('/random', function(req, res, next) {
	req.session.visits = jokeCount;
	jokeCount++;
	res.render('jokes', {jokes: jokes.getRandomJoke(), notification: "", visits: req.session.visits})
});

router.get('/jokes', function(req, res, next) {
	req.session.visits = jokesCount;
	jokesCount++;
	res.render('jokes', {jokes: jokes.allJokes, notification: "", visits: req.session.visits})
});

router.get('/createJoke', function(req, res, next){
	req.session.visits = storeJoke;
	storeJoke++;
	res.render('createJoke', {visits: req.session.visits});
})

router.post('/joke', function(req, res, next) {
	var joke = req.body.newjoke;
	jokes.addJoke(joke);
	res.render('jokes',{jokes: joke, notification: "Your joke has been submited successfully"})
});

module.exports = router;