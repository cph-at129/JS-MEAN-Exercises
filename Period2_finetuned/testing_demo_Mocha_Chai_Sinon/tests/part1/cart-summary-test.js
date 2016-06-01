var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect; // we are using the "expect" style of Chai
var CartSummary = require('./../../src/part1/cart-summary');
var tax = require('./../../src/part1/tax');

describe('CartSummary', function () {

    it('getSubtotal() should return 0 if no items are passed in', function () {
        var cartSummary = new CartSummary([]);
        expect(cartSummary.getSubtotal()).to.equal(0);
    });

    it('getSubtotal() should return the sum of the price * quantity for all items', function () {
        var cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
                id: 2,
                quantity: 2,
                price: 30
            }, {
                id: 3,
                quantity: 1,
                price: 40
            }]);

        expect(cartSummary.getSubtotal()).to.equal(300);
    });
});

//======  stubbing ==================

// I have simply stubbed out tax.calculate with the following
describe('getTax()', function () {
    //executes before every test
    beforeEach(function () {
        sinon.stub(tax, 'calculate', function (subtotal, state, done) {
            setTimeout(function () {//used to mimic the asynchronous behavior of this method
                done({//calls done with a static tax details object containing a tax amount of 30
                    amount: 30
                });
            }, 0);
        });
    });
    ////executes after every test
    afterEach(function () {
        tax.calculate.restore();
    });

    it('get Tax() should execute the callback function with the tax amount', function (done) {
        var cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
                id: 2,
                quantity: 2,
                price: 30
            }, {
                id: 3,
                quantity: 1,
                price: 40
            }]);

        cartSummary.getTax('NY', function (taxAmount) {
            expect(taxAmount).to.equal(30);
            done();
        });
    });
});

