"use strict";

let Promise  = require('bluebird');
let fs       = require('fs');
let redis    = require('redis');

Promise.promisifyAll(redis, { suffix: 'Promise' });
let redisDB  = redis.createClient();
console.log("a> "+JSON.stringify(Object.keys(redisDB).length));
Promise.promisifyAll.defaultFilter = function () { console.log("blah!!"); };

Promise.promisifyAll(redisDB, {
    suffix : 'Promise',
    filter : function (name, func, target) {
         if ( ! Promise.promisifyAll.defaultFilter(name, func, target) )
             return false;
        return !(name === 'on'   ||
                 name === 'once' ||
                 name === 'emit' ||
                 name === 'addListener' ||
                 name === 'removeListener' ||
                 name === 'removeAllListeners' ||
                 name === 'listeners');
    }
}
);
console.log("b> "+JSON.stringify(Object.keys(redisDB).length));

redisDB.on("error", function (err) {
    console.log("Error " + err);
});

redisDB.selectAsync(1)
.then(
    function () {
        console.log("Using DB #1");
    }
});
