var myArr = ['Aleksandar', 19, 'Ola', 21, 'Nela', 21];

Array.prototype.myFilter = function(callback){
	var out = [],
		i,
		len;
	for (i = 0, len=this.length; i < len; i+=1) {
		if(callback(this[i], i, this)){
			out.push(this[i]);
		}
		
	};
	return out;
}

var myfilteredArr = myArr.myFilter(function(item, i, arr){
		
		if(typeof item === 'string'){
			if(item.length <= 3){
				return item;
			}
		}
});

console.log(myfilteredArr.join(", "));
console.log("=========================");
//============================================
Array.prototype.myMap = function(callback){
	var out = [],
		i,
		len;
	for(i = 0, len = this.length; i<len;i+=1){
		out.push(callback(this[i], i, this));
	}
	return out;	
}

var myMappedArr = myArr.myMap(function(item, index, arr){
	if(typeof item === 'string'){
			return item.toUpperCase();
		}else{
			return item;
		}
});

console.log(myMappedArr.join(", "));