var fs,
path;

fs = require('fs');
path = require('path');

module.exports = function(directoryName, fileExtension, callback){

	fs.readdir(directoryName, function(err, list){

    if(err){
    	return callback(err);
    }

    new_file = list.filter(function(item){

    	if(path.extname(item) == '.' + fileExtension){
    		return item;
    	}

    });
    return callback(null, new_file);
    
});

}





