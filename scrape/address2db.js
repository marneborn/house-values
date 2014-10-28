"use strict";

let Promise  = require('bluebird');
let fs       = require('fs');
let mongodb  = Promise.promisifyAll(require('mongodb'), { suffix: 'Promise' });

let isInPoly = require('./isInPoly');
let config   = require('./config');

let uri = 'mongodb://'+config.mongoLab.user+':'+config.mongoLab.password
    +'@'+config.mongoLab.host+':'+config.mongoLab.port
    +'/'+config.mongoLab.name;

let addresses = JSON.parse(fs.readFileSync('addresses.json'));
var citems = [];
var vitems = [];
for (var addr in addresses) {
    if ( !isInPoly(addresses[addr].position, config.Bounds.all) )
        continue;
    if ( isInPoly(addresses[addr].position, config.Bounds.cumberland) )
        citems.push(addresses[addr]);
    else
        vitems.push(addresses[addr]);
}
console.log('c> '+citems.length);
console.log('v> '+vitems.length);

var dbPromise = mongodb.MongoClient
.connectPromise(uri)
.catch( function (err) { console.log("Couldn't open DB: "+err); process.exit(); });

var cPromise = dbPromise.call('createCollectionPromise', 'cumberland');
var vPromise = dbPromise.call('createCollectionPromise', 'vargas');
cPromise.then(
    function ( coll ) { console.log("c> "+coll); }
);

Promise.all([
    cPromise.call('removePromise')
    .then (
        function () { return cPromise.call('insertPromise', citems) }
    ),
    vPromise.call('removePromise')
    .then (
        function () { return vPromise.call('insertPromise', vitems) }
    )
])
.then(
    function () {
        dbPromise.call('close');
    }
);


/*
let redisDB  = redis.createClient();

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

redisDB.selectPromise(1)
.then(
    function () { console.log("Using DB #1"); }
)
.then(
    function () {
        let addresses = JSON.parse(fs.readFileSync('addresses.json'));

        var items = [];
        for (var addr in addresses) {
            if ( !isInPoly(addresses[addr].position, config.Bounds.all) )
                continue;
            items.push(addr, JSON.stringify(addresses[addr]));
        }

        return redisDB
        .msetPromise(items)
        .then( function () { console.log("Added all"); } );
    }
);
*/
