/* */
//Dependencies that is libraries
var http = require('http');
var url = require('url');
var server= http.createServer(function(req,res){ 

    //metadata about url Parsed
    var ParsedUrl = url.parse(req.url,true);


    // we get url and parse it then get path,send respomse
    res.end('Hello World\n');
});

server.listen(3000, function(){
    console.log('Server listening at port 3000')
});   
/*each call at endpoint calls the funct then the objects 
req==getting url that use requests and res are filled */
/*parsed url is true so that query string module can be called so that
 we can get url object by parsing query string data */
