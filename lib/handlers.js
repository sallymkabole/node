<<<<<<< HEAD
var _data = require('./data');
var helpers = require('./helpers');
=======
>>>>>>> 0801c7483fe4432af70add1fcf70c2397c52d37d
//def handler
var handlers = {}

handlers.users= function(data, callback){
    var acceptableMethods = ['post','get','put', 'delete'];
    //if request method is not == to
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback);
    }else {
        callback(405);
    }
};

//user submethods
handlers._users = {};
handlers._users.post=function(data,callback){

    //check user gives all payloads
    var firstName= typeof(data.payload.firstname)== 'string '&& data.payload.firstName.trim().length>0 ? data.payload.firstName.trim().length>0:false;
    var LastName= typeof(data.payload.lastname)== 'string '&& data.payload.lastName.trim().length>0 ? data.payload.lastName.trim().length>0:false;
    var phone= typeof(data.payload.phone)== 'string '&& data.payload.phone.trim().length==10 ? data.payload.phone.trim().length>0:false;
    var password= typeof(data.payload.password)== 'string '&& data.payload.password.trim().length>0 ? data.payload.password.trim().length>0:false;
    var tosAgreement = typeof(data.payload.password)== 'boolean '&& data.payload.tosAgreement==true ? true:false;

    if(firstName && lastName && phone && password){
<<<<<<< HEAD
        //ensure user doesnt exist read user data and results error i.e not found
        _data.read('users',phone, function(err,data){
            if(err){
                //hash pass
                var hashedPassword = helpers.hash(password);

            } else{

                callback(400,{'Error':'User with that pone number exists'})
            }
        })
=======
        //ensure user doesnt exist 
>>>>>>> 0801c7483fe4432af70add1fcf70c2397c52d37d

    }else{
        callback(400,{'Error':'Missing required fields'});
    }

    
};


handlers._users.get=function(data,callback){

};
handlers._users.put=function(data,callback){

};
handlers._users.delete=function(data,callback){

};



//sample handler
handlers.ping = function(data,callback){
    /*handlers callback after they are 
    done with status code and payload object */
    callback(200);
};
//404
handlers.notFound = function(data,callback){
    callback(404);
};


module.exports = handlers