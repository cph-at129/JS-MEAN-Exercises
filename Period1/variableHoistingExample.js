
myFunc();//myFunc is fully hoisted 

function myFunc(){
	console.log("I am fully hoisted");
}

console.log(myVar);//myVar is undefined 

var myVar = "Now I am defiend";

console.log(myVar);

//===========================================
//better design - declare all variables on top

var myVar1,
	myVar2;

//..... some code in here

myVar1 = "Assigned value";

//..... some more code in here

myVar2 = "Assigned value 2";




