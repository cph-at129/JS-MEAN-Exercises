var express = require('express');
var router = express.Router();
var jokes = require("../model/jokes");

router.get('/', function(req, res, next){
	res.render('jokesApi');
})

router.get('/jokes', function(req, res, next) {
	jokes.allJokes(function(err, data){
		if(err){
			console.log("Error in /jokes");
			res.redirect('/');
		}else{
			res.render('jokes', {jokes: data})
		}
	});
});

router.get('/search', function(req, res, next) {
	res.render('jokeSearch');
});
router.post('/jokeSearch', function(req, res, next) {

	var searchType = req.body.searchType;
	var searchInput = req.body.searchInput;
	var criteria = {
		searchType: searchType,
		searchInput: searchInput
	}
	
	//maybe some validation before going to the db
	//
	jokes.findJoke(criteria, function(err, data){
		if(err){
			console.log("Error in /jokeSearch");
			res.redirect('/');
		}else{
			res.render('jokeSearch', {jokes: data, notification: data.length + " jokes found!"});
		}
	});
});

router.post('/jokeEditor', function(req, res, next){
	var criteria = {};
	criteria.searchType = "id";
	criteria.searchInput = req.body.jokeToEdit_id;
	console.log(criteria.searchInput);

	jokes.findJoke(criteria, function(err, data){
		if(err){
			console.log("/jokeEditor");
			res.redirect('/');
		}else{
			console.log(data[0].joke);
			res.render('jokes', {jokeEditor: data[0]});
		}
	});

});

router.post('/deleteJoke', function(req, res, next){
	
	var jokeToDelete = req.body.jokeToDelete;
	var jokeToDelete_id = req.body.jokeToDelete_id;

	jokes.deleteJoke(jokeToDelete_id, function(err, data){
		if(err){
			console.log("Error in /deleteJoke/:id");
			res.redirect('/');
		}else{
			jokes.allJokes(function(err, alljokes){
				if(err){
					console.log("Error in /jokes");
					res.redirect('/');
				}else{
					res.render('jokes', {jokes: alljokes, notification: jokeToDelete + " has been deleted!"})
				}
			});
			
		}
	});
});

router.post('/editJoke', function(req, res, next){
	
	var jokeToEdit_joke = req.body.jokeToEdit;
	var jokeToEdit_id = req.body.jokeToEdit_id;

	var jokeToEdit = {
		jokeToEdit_joke: jokeToEdit_joke,
		jokeToEdit_id: jokeToEdit_id
	}

	jokes.editJoke(jokeToEdit, function(err, data){
		if(err){
			console.log("Error in /editJoke");
			res.redirect('/');
		}else{
			jokes.allJokes(function(err, alljokes){
				if(err){
					console.log("Error in /jokes");
					res.redirect('/');
				}else{
					res.render('jokes', {jokes: alljokes, notification: jokeToEdit_joke + " has been edited!"})
				}
			});
		}
	});
});

router.get('/random', function(req, res, next) {
	jokes.randomJoke(function(err, data){
		if(err){
			console.log("Error in /random");
			res.redirect('/');
		}else{
			res.render('jokes', {jokes: data})
		}
	});
});

router.get('/createJoke', function(req, res, next){
	res.render('createJoke', {visits: req.session.visits});
})

router.post('/joke', function(req, res, next) {
	var joke = req.body.newjoke;
	jokes.addJoke(joke, function(err, data){
		if(err){
			console.log("Error in /joke");
			res.redirect('/');
		}else{
			res.render('jokesApi', {notification: "Your joke has been submited successfully"})
		}
	});
});

router.put('/joke', function(req, res, next){
	var joke = req.body.editedJoke;
	jokes.editJoke(joke, function(err, data){
		if(err){
			console.log("Error in /joke");
			res.redirect('/');
		}else{
			res.render('jokes', {jokes: data, notification: "The joke has been edited"})
		}
	});
});

router.delete('/joke/:id', function(req, res, next){
	var id = req.params.id;
	jokes.deleteJoke(id, function(err, data){
		if(err){
			console.log("Error in /joke");
			res.redirect('/');
		}else{
			res.render('jokes', {jokes: data,notification: "The joke has been deleted"})
		}
	});
});

module.exports = router;