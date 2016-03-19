var expect = require("chai").expect;
var request = require("request");
var expect = require("chai").expect;
var http = require("http");
var app = require('../app');
var server;
var TEST_PORT = 3456;

before(function(done){
  var app = require('../app');
  server = http.createServer(app);
  server.listen(TEST_PORT,function(){
    done();
  });
})
after(function(done){
  server.close();
  done();
})

describe("POST: /gameapi/newgame ", function () {
  var options = {
    url: "http://localhost:" + TEST_PORT + "/api/joke",
    method: "POST",
    json: true,
    body: {joke: "Its better to be late than to arrive ugly"}
  }

  it("should get a Game Object (Player-1)", function (done) {
    request(options, function (error, res, body) {
      var addedJoke = body.joke;
      expect(addedJoke.joke).to.be.equal("Its better to be late than to arrive ugly");
      done();
    });
  })
});