//Load the request module
var request = require('request');

//test the api

//get all jokes
request('http://localhost:3000/api/jokes', function (error, response, body) {
    console.log("=====================================================");
    console.log("GET request to: http://localhost:3000/api/jokes");
    console.log("-----------------------------------------------------");
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

//get joke with id=1
request('http://localhost:3000/api/joke/1', function (error, response, body) {
    console.log("=====================================================");
    console.log("GET request to: http://localhost:3000/api/joke/1");
     console.log("-----------------------------------------------------");
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

//get a random joke
request('http://localhost:3000/api/joke', function (error, response, body) {
    console.log("=====================================================");
    console.log("GET request to: http://localhost:3000/api/joke");
     console.log("-----------------------------------------------------");
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

//create a joke 
request({
    url: 'http://localhost:3000/api/joke',
    method: 'POST',
    json: {
        joke: "hahahhahahahahhaahhaha"
    }
}, function(error, response, body){
    console.log("=====================================================");
    console.log("POST request to: http://localhost:3000/api/joke");
     console.log("-----------------------------------------------------");
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});

//edit the joke with id = 2
request({
    url: 'http://localhost:3000/api/joke/2',
    method: 'PUT',
    json: {
        joke: "hahahhahahahahhaahhaha"
    }
}, function(error, response, body){
    console.log("=====================================================");
    console.log("PUT request to: http://localhost:3000/api/joke/2");
     console.log("-----------------------------------------------------");
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});

//delete joke with id=1
request.delete('http://localhost:3000/api/joke/1', function (error, response, body) {
    console.log("=====================================================");
    console.log("DELETE request to: http://localhost:3000/api/joke/1");
     console.log("-----------------------------------------------------");
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
