var express = require('express');
var router = express.Router();
var redis = require("redis");

var PORT = 19300;
var ENDPOINT = 'pub-redis-19300.eu-west-1-2.1.ec2.garantiadata.com';
var PASSWORD = 1111;

var client = redis.createClient(PORT, ENDPOINT, { no_ready_check: true });

client.auth(PASSWORD, function (err) {
    if (err) { console.log(err); }
    console.log("Redis all good! Connected!");
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//--------------------------------------
//simple session routes

router.get('/session/set/:name/:email', function (req, res) {
  var user = { name: req.params.name, email: req.params.email };
  req.session.user = user;
  res.send('session written to Redis successfully: ' + JSON.stringify(user));
});

router.get('/session/get/', function (req, res) {
  if (req.session.user) {
    res.send('Session value stored in Redis: ' + JSON.stringify(req.session.user));
  }
  else res.send("No session value stored in Redis ");
});

router.get('/redis/keys', function(req, res){
  client.get("key1", function (err, reply) { 
    if (err) throw err; 
    res.json(reply);
    //console.log(reply.toString()); });
});



module.exports = router;
