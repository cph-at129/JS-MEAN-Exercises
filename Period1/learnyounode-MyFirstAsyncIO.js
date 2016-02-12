/**
 * Created by terziev on 2/5/2016.
 */

var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, data){

    if(err){
        console.log("An error occured");
    }else{
        var lines = data.split("\n");
        var output = lines.length - 1;
        console.log(output);
    }

});