//=========================================================================================================
//----------  Why would you consider a Scripting Language as JavaScript as your Backend Platform. ----

//-   NodeJS is faster on the server, than anyone has expected. Faster than Java or other
// options;

// when combined with a Documen DB such as MongoDB and JSON offers:
// ■ JS on the client
// ■ JS on the server
// ■ JS on the DB

//-   quick requests for data thanks to Node.js ­ perfect for more dynamic pages

//-  Node.js and JavaScript make it much easier to migrate code

//===============================================================
//-----------  Explain, using a relevant examples, your strategy for implementing--------------- 
//------------    a REST-API with Node/Express and show how you can "test" all the------- 
//----------------four CRUD operations programmatically using --------------
//-----------------for example the Request package ----------

//api_demo  ->>>>


//======================================================================
//-----------    Explain, using relevant examples, about testing JavaScript code, -------
//-------------    relevant packages (Mocha etc.) and how to test asynchronous code.  ---------

//http://mochajs.org/   -   test framework
//http://chaijs.com/guide/styles/    ->  Assertion library
//http://sinonjs.org/  ->  Spies, Stubs and Mocks

//https://www.codementor.io/nodejs/tutorial/unit-testing-nodejs-tdd-mocha-sinon 

//mocha tests --recursive --watch

/*
            Mocha is a feature-rich JavaScript test framework running on Node.js and the browser, 
            making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and 
            accurate reporting, while mapping uncaught exceptions to the correct test case
            Mocha can use any assertion library Assertions
*/
/* 
        Behavior-Driven Development
            -   Describe User Registration
                    While validating the registration info
                    - it should make sure the email address is valid
                    - it should verify the email doesn't already exist
                        ...
                    While creating the user's database record
                    - it should save successfully in the database
*/


//=====       Using Nodes built in assert module  ===================

/* 
    In the example below describe and it is mocha, and the assert statements 
    comes from the initial require("assert")
*/
var assert = require("assert"); //Use Nodes built in assertion libraty

describe('Array', function () {         //The describe() block is used to group individual specs into a suite. At least one describe block is required
    describe('#indexOf()', function () {
        it('should return -1 when value is not present', function () {         //The it() block sets up the code for a single test (spec)
            assert.equal(-1, [1, 2, 3].indexOf(5));          //The assert module contains a series of matchers which perform the comparison
            assert.equal(-1, [1, 2, 3].indexOf(0));
        })
    })
})
//--------------------------------------------------------------------------------------
//============  Using chai  =================
var expect = require("chai").expect;

describe('Array', function () {
    describe('Verify the #indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(3)).to.be.equal(2);
        })
    })
});


//fails because we never let Mocha know that we are testing an async call
//it gets called before setTimeout() completes, so the value of foo doesn't get set to true in time

describe("this one won't work", function () {
    var foo = false;
    before(function () {
        // async call using setTimeout
        setTimeout(function () {
            foo = true;
        }, 1000);
    });

    it("should fail", function () {
        expect(foo).equals(true);
    });
});

//---------------
//SOLUTION: we pass done into the function

describe("this one will work", function () {
    var foo = false;
    before(function (done) {
        setTimeout(function () {
            foo = true;
            done();
        }, 1000);
    });
    it("should pass", function () {
        expect(foo).equals(true);
    });
});


//=================================================================================
//------------          Explain, using relevant examples, concepts  ---------------------------------
//-----------     related to the testing a REST-API using Node/JavaScript + relevant packages  -------



//=======================================================================================
//----------     Explain, using relevant examples, different ways ------------------------------
//-----------          to mock out databases, HTTP-request etc.   --------------------------

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Mocking with MongoDB and mongoose <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
// https://github.com/mccormicka/Mockgoose

//open testing_demo_mockgoose

//npm install mockgoose --save-dev

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var mockgoose = require('mockgoose');

before(function (done) {
    mockgoose(mongoose).then(function () {
        mongoose.connect('mongodb://example.com/TestingDB', function (err) {
            done(err);
        });
    });
});

describe('...', function () {
    it("...", function (done) {
        // ...
        done();
    });
});

