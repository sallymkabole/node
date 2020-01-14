var fs= require('fs');
var path= require('path');

var lib = {};
//define base directory for file that we'll write into joins current dir to data dir
lib.baseDir = path.join(__dirname,'/../.data');
lib.create=function(dir,file,data,callback){
     fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx',function(err,fileDescriptor){
         if(!err && fileDescriptor){
             //convert data to string before writing to a file
             var stringData= JSON.stringify(data);
             fs.writeFile(fileDescriptor, stringData,function(err){
                 if(!err){
                     fs.close(fileDescriptor,function(err){
                         if(!err){
                             callback(false); 

                         }else{
                             callback('error closing new file');
                         }
                     });

                 }else{
                     callback('Error writing to new file');
                 }

             });

         }else{
             callback('Could not create new file, it may already exist');
         }

     });
};
 

module.exports = lib;