var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {changeBy(1);},
    decrement: function() {changeBy(-1);},
    value: function() { return privateCounter;}
  }
};
var counter1 = makeCounter();
var counter2 = makeCounter();

counter1.increment();
counter2.increment();
counter2.increment();

console.log(counter1.value());
console.log(counter2.value());
//counter1.increment();
//counter1.increment();
//lert(counter1.value()); /* Alerts 2 */

//============================================
var personInfo = function(){
	var person = {name: "Aleksandar", age: 21};
	function setAge(val){
		person.age = val;
	}
	function setName(val){
		person.name = val;
	}
	function getInfo(){
		return person.name + " " + person.age;
	}
	return {
		setAgeFunc: function(val){setAge(val);},
		setNameFunc: function(val){setName(val);},
		getInfoFunc: function(){return getInfo();}
	}
};

console.log(personInfo().getInfoFunc());