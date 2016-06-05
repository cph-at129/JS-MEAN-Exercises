/**
 * Created by terziev on 2/5/2016.
 */

    var fs,
        path,
        directoryName,
    fileExtension,
    i,
    listLength,
    tempExt;

fs = require('fs');
path = require('path');

directoryName = process.argv[2];
fileExtension = '.' + process.argv[3];//.txt

fs.readdir(directoryName, function(err, list){

    //list is an arr of file names
    for(i=0, listLength=list.length; i< listLength; i++){
        tempExt = path.extname(list[i]);
        if(tempExt == fileExtension){
            console.log(list[i]);
        }
    }

});