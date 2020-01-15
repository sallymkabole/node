/* */
//Dependencies that is libraries
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs =require('fs');
var _data=require('./lib/data');
var handlers= require('./lib/handlers');

// creating file use lib.create from data.js and fill it's parameters
// @TODO
_data.create('test','newFile',{'name':'sally'},function(err){
    console.log('This is an error', err);
});

var server= http.createServer(function(req,res){ 

    //get url and parse it
    var ParsedUrl = url.parse(req.url,true);
    //get path
    var path = ParsedUrl.pathname;
    //trimm path i.e remove extra slashes
    var trimmedPath= path.replace(/^\/+|\/+$/g, '');

    //te query string as object
    var queryStringObject= ParsedUrl.query;

    //get method
    var method= req.method.toLowerCase();
    //get headers as objects
    var headers = req.headers;
    //get payload
    var decoder = new StringDecoder( 'utf-8');
    /*Payloads come in as streams of data i.e bits osf data
    we collect em them combine them to form sth meaningful*/
   
   
   //store payload by appending it to  bufferbi.e bind buffer tpo the event that request emits
   //pass emited event on foll callback func
   
    var buffer=''
    req.on('data',function(data){
        // receive streams of data, decode it to utf-8 then write append it to buffer 
        buffer+= decoder.write(data)
         
    });
    req.on('end',function(){
        buffer+= decoder.end();
        //chose handler for this request if not undefined check if path exist in request router
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined'? router[trimmedPath] :handlers.notFound;
        //construct object to pass to handler
        var data={
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method ,
            'payload' :buffer,
            'headers':headers
        };

        //route request to route in handler
        chosenHandler(data,function(statusCode, payload){
        statusCode= typeof(statusCode) =='number'? statusCode : 200;
        payload = typeof(payload) =='object'? payload : {};
        //convert payload to str and return it to user using json stringify
        //return response 
        var payloadString= JSON.stringify(payload);
        //send header content type with response to return json to user without telling them

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end('payloadString');
        console.log('Returning this:',statusCode, payloadString);


        });
        


        
    // log the requested path in term
    

    });
    // we get url and parse it then get path,send respomse
    
});

server.listen(config.port, function(){
    console.log('Server listening at port ' +config.port+ ' in ' +config.envName );
});   
/*each call at endpoint calls the funct then the objects 
req==getting url that use requests and res are filled */
/*parsed url is true so that query string module can be called so that
 we can get url object by parsing query string data */



 // request router
 var router = { 
     'ping' : handlers.ping
     'users':handlers.users
 };