/**
 * Created by terziev on 2/4/2016.
 */

var fs = require('fs');

var bufferObj = fs.readFileSync(process.argv[2]);

var bufferStr = bufferObj.toString();

var lines = bufferStr.split("\n");

var result = lines.length - 1;

console.log(result);