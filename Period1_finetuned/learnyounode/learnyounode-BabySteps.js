/**
 * Created by terziev on 2/4/2016.
 */

//var arg1 = process.argv[1];
//var arg2 = process.argv[2];

var argsArr = process.argv;
var sum = 0;
for(var i=2; i< argsArr.length; i++){
    sum += parseInt(argsArr[i]);
}

var a = {};

console.log(sum);