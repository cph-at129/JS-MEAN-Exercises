var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Joke = mongoose.model('Joke');
var User = mongoose.model('User');

router.route('/jokes')
    //creates a new joke
    .post(function(req, res) {

        var joke = new Joke();
        joke.jokeText = req.body.jokeText;
        joke.created_by = req.body.created_by;
        joke.created_at = req.body.created_at || Date.now();
        joke.save(function(err, joke) {
            if (err) {
                return res.send(500, err);
            }
            return res.json(joke);
        });
    })
    //gets all jokes
    .get(function(req, res) {
        Joke.find(function(err, jokes) {
            if (err) {
                return res.send(500, err);
            }
            return res.json({jokes: jokes});
        });
    });

//joke-specific commands
router.route('/jokes/:id')
    //gets specified joke
    .get(function(req, res) {
        Joke.findById(req.params.id, function(err, joke) {
            if (err)
                res.send(err);
            res.json(joke);
        });
    })
    //updates specified joke
    .put(function(req, res) {
        Joke.findById(req.params.id, function(err, joke) {
            if (err)
                res.send(err);

            joke.created_by = req.body.created_by;
            joke.jokeText = req.body.jokeText;

            joke.save(function(err, joke) {
                if (err)
                    res.send(err);

                res.json(joke);
            });
        });
    })
    //deletes the joke
    .delete(function(req, res) {
        Joke.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    }); 
    
module.exports = router;       