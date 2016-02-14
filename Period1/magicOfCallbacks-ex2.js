	var myArr = ['Aleksandar', 19, 'Ola', 21, 'Nela', 21];

	function myFilter(arr, callback){
		var newArr = [];

		arr.forEach(function(item){
			if (callback(item)) {
			newArr.push(item);
			}
		});
		return newArr;
	}
	
	var myArrUserFiltered = myFilter(myArr, function(item){

		if(typeof item === 'string'){
			if(item.length <= 3){
				return item;
			}
		}

	});
	console.log("===============================");
	console.log("My filter: ");
	console.log(myArrUserFiltered.join(", "));

	//===========================================
	function myMap(arr, callback){
		var output = [];
		arr.forEach(function(item){
			 output.push(callback(item));
		});
		return output;
	}

	var myArrUserMapped = myMap(myArr, function(item){

		if(typeof item === 'string'){
			return item.toUpperCase();
		}else{
			return item;
		}

	});
	console.log("========================================");
	console.log("My mapping: ");
	console.log(myArrUserMapped.join(", "));