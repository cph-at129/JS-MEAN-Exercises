
// require mongoose models
require('../models/Category');
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    codeToTest = require('../lib/codeToTest');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Category = mongoose.model('Category'),
    ObjectId = mongoose.Types.ObjectId();

// create mock models using data we can count on
beforeEach(function (done) {
    mockgoose.reset();
    Category.create({
        _id: ObjectId,
        name: "two",
        ancestors: [{
            name: "one"
        }],
        parent: {
            name: "one"
        }
    }, function (err, model) {
        done(err);
    });
});

afterEach(function (done) {
    //Reset the database after every test.
    mockgoose.reset();
    done();
});

// use Chai.js BDD style assertions
describe('SHOULD', function () {
    it('should return the category id based on a given name', function (done) {

        // create a sample test object
        var catObj = {
            name: "one/two",
        };

        /* exercise my code function by passing in
        my fake category object, which will run a
        db lookup against our mock, and do some 
        processing to return the proper ObejctId */
        codeToTest.getIdByName(catObj, function (err, result) {
            // catch assertion error, if a failure
            try {
                should.exist(result);
            } catch (e) {
                // signal that the test is done with error
                e.message = "DB category lookup failed."
                done(e);
            }

            // compare a string to a string
            var id = result._id.toString();
            id.should.be.equal(ObjectId.toString());
            // test will timeout with out done()
            done();
        });
    });
});