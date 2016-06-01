var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwtConfig = require("../config/jwtconfig").jwtConfig;
var jwt         = require('jwt-simple');

router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({  state: 'failure', message: 'Authentication failed. User not found.' });
        } else if(user){
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var iat = new Date().getTime() / 1000; //convert to seconds
                    var exp = iat + jwtConfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        usr: user.username
                    };
                    var token = jwt.encode(payload, jwtConfig.secret);
                    // return the information including token as JSON
                    res.json({ state: 'success', message: 'Logged in successfully!', token: token });
                } else {
                    res.status(401).send({  state: 'failure', message: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});

router.post('/signup', function(req, res) {
    
    if (!req.body.username || !req.body.password) {
        res.send({ state: 'failure', user: null, message: 'Please pass name and password.' });
    }
    else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.send({ state: 'failure', user: null, message: 'Username already exists.' });
            }
            res.send({ state: 'success', user: newUser, message: 'Successfully created new user.' });
        });
    }

});

//log out
router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;