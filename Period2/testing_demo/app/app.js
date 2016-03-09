function sum(numArr){
	var result = 0;
	result = numArr.reduce(function(sum, num){
		return sum + num;
	}, 0);
	return result;
}

module.exports = sum;