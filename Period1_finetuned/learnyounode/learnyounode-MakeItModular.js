

mymodule = require('./ex6_mymodule');

mymodule(process.argv[2], process.argv[3], function(err, data){

	if(err != null){
		console.log(err);
	}
	data.forEach(function(item){
		console.log(item);
	});

});

