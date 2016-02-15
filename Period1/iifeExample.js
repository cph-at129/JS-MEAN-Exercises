//purpose - introduce new scope

var data = "myData";

if(data){
	var temp = "tempvar";//temp is in the global scope!!
	console.log(temp);
}else{
	var temp = "tempvar";//and here again 
	console.log(temp);
}
//=================================

if(data){
	(function(){

		var temp = "tempVar";//now temp exists only between the iife scope

	}());
}else{
	//............
}

