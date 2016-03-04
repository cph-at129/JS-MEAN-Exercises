var express = require('express');
var router = express.Router();
var jokesModel = require('../model/jokes');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'our App' });
});

router.get('/login', function(req, res, next){
	res.render('login');
});

router.get('/jokes', function(req, res, next){
	var randomJoke = jokesModel.getRandomJoke();
	console.log(randomJoke);
	res.render('jokes', {randomJoke: randomJoke});
});

router.get('/alljokes', function(req, res, next){
	var allJokes = jokesModel.allJokes;
	res.render('alljokes', {allJokes: allJokes});
	res.render('login');
});
router.get('/jokesForm', function(req, res, next){
	res.render('jokesForm');
});
router.post('/addjoke', function(req, res, next){
	var newjoke = req.body.newjoke;
	jokesModel.addJoke(newjoke);
	res.render('index',{
		notification: 'Your joke has been saved!'
	});

});
router.post('/login', function(req, res, next){
	var userName = req.body.userName;
	if(userName){
		res.render('index', {
			title: 'our App',
			loginSuccessful: userName + '! You are now logged in!'
		});
	}else{
		res.redirect('/login');
	}
});

module.exports = router;
