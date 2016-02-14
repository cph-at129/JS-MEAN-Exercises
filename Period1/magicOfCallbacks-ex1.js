var myArr = ['Aleksandar', 19, 'Ola', 21, 'Nela', 21];

	var filteredArr = myArr.filter(function(item){
		
		if(typeof item === 'string'){
			if(item.length <= 3){
				return item;
			}
		}

	});
	console.log("Filter: ");
	console.log(myArr.join(", "));
	console.log(filteredArr.join(", "));

	//=========================================

	var mappedArr = myArr.map(function(item){
		if(typeof item === 'string'){
			return item.toUpperCase();
		}else{
			return item;
		}
		
	});
	console.log("==============================================");
	console.log("Mapping: ");
	console.log(mappedArr.join(", "));