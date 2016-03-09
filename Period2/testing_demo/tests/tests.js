//var expect = require('chai').expect,
//sum = require('../app/app');

describe('function sum', function () {
	describe('valid input', function () {
		it('should return 0, when passed an empty array', function () {
			var arr = [],
			actual = sum(arr),
			expected = 0;

			expect(actual).to.be.equal(expected);
		});
		it('should return number when passed an array with one number', function () {
			var num = 10,
			arr = [num],
			actual = sum(arr),
			expected = num;

			expect(actual).to.be.equal(expected);
		});
		describe('invalid input', function () {
			it('should throw when not passed an argument', function () {
				expect(function(){
					sum();
				}).to.throw();
			});
		});
	});
});
it('testing async function', function (done) {
	setTimeout(function(){
		expect(10).to.equal(10);
		done();
	}, 1000);
});
describe('testing with sinon', function () {
	before(function () {
		sinon.stub(console, 'log', function(){
			return 5;
		});
	});

	it('test console.with sinon', function () {
		
		var result = console.log();
		expect(result).to.equal(5);
	});

	after(function () {
		console.log.restore();
	});
});
