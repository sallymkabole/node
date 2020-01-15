import { Hash } from "crypto";
var crypto = require('crypto');
/create container for all helpers
var helpers = {};
//create sha 256 Hash
helpers.hash = function(str){
    if(typeof(str) == 'string' && str.length >8){
        var hash =crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;

    }else {
        return false;
    }

};


module.exports = helpers;