var expect = require("chai").expect;
var jokes = require("./../jokes");
var nock = require("nock");

var testJoke = { "id": 1234, "joke": "ha ha ha", "reference": "unknown" };
var testJoke2 = { "id": 1235, "joke": "bla bla", "reference": "unknown" };

var n = nock('http://jokes-plaul.rhcloud.com');

describe('Joke API Get', function () {

    before(function (done) {
        n.get('/api/joke')
            .reply(200, testJoke);
        done();
    });

    it('should return the hahaha joke', function (done) {
        jokes.getJoke(function (err, joke) {
            if (err) {
                throw err;
            }
            expect(joke.id).to.be.equal(1234);
            expect(joke).to.be.eql(testJoke);
            done();
        })
    });
});

describe('Joke API POST', function () {

    before(function (done) {
        n.post('/api/joke', testJoke2)
            .reply(201, testJoke2);
        done();
    });

    it('should return the blabllabla joke', function (done) {
        jokes.addJoke(testJoke2 ,function (err, joke) {
            if (err) {
                throw err;
            }
            expect(joke.id).to.be.equal(1235);
            expect(joke).to.be.eql(testJoke2);
            done();
        })
    });
});