"use strict";

let Promise  = require('bluebird');
let http     = require('http');
let fs       = require('fs');
let mongodb  = Promise.promisifyAll(require('mongodb'), { suffix: 'Promise' });

let isInPoly = require('./isInPoly');
let config   = require('./config');

let bounds = isInPoly.getBounds(config.Bounds.all);
console.log("Bounds1: "+JSON.stringify(bounds));


let uri = 'mongodb://'+config.mongoLab.user+':'+config.mongoLab.password
    +'@'+config.mongoLab.host+':'+config.mongoLab.port
    +'/'+config.mongoLab.name;

var dbPromise = mongodb.MongoClient
.connectPromise(uri);

var cPromise = dbPromise.call('collectionPromise', 'cumberland', { strict:true } );
var vPromise = dbPromise.call('collectionPromise', 'vargas',     { strict:true } );

var point = { lat: bounds.ll.lat, lng: bounds.ll.lng };
let step = { lng:0.000004, lat:0.000002 };

let count = 5;
let restPromises = [cPromise, vPromise];

while ( point.lat < bounds.ur.lat ) {

//     if ( count === 0 ) break;
//     count--;

    restPromises.push(
        makeRESTCall( makeURL(point, 500) )
        .then(
            function (results) {
                let dbPromises = [];
                for (var i=0; i<results.length; i++) {

                    let obj = {
                        hasInfo : false,
                        isValid : true,
                        address : results[i].Location.Address.Label,
                        position: {
                            lat:results[i].Location.DisplayPosition.Latitude,
                            lng:results[i].Location.DisplayPosition.Longitude
                        },
                        district: results[i].Location.Address.District
                    };

                    if ( !isInPoly(obj.position, config.Bounds.all) )
                        continue;

                    let collPromise = isInPoly(obj.position, config.Bounds.cumberland)
                            ? cPromise : vPromise;

                    dbPromises.push(
                        collPromise
                        .call('findOnePromise', {address: obj.address})
                        .then(
                            function (item) {
                                if ( item === null )
                                    return Promise.resolve(true);
                                console.log("adding> "+obj.address);
                                return collPromise.call('insertPromise', obj);
                            }
                        )
                    );
                }
                return Promise.all(dbPromises);
            }
        )
    );

    point.lng += step.lng;
    if ( point.lng > bounds.ur.lng ) {
        point.lng  = bounds.ll.lng;
        point.lat += step.lat;
    }
}

Promise.all(restPromises)
.then(
    function () { console.log('closing'); dbPromise.call('close'); }
);

/*
Promise
.all(promises)
.then(
    function ( data ) {
        fs.writeFile('tmp.json', JSON.stringify(data, null, 4));
        let byAddr = {};
        let counts = { district : {} };
        for ( var i=0; i<data.length; i++ ) {
            for ( var j=0; j<data[i].length; j++ ) {

                let addr = data[i][j].Location.Address.Label;

                if ( byAddr[addr] ) continue;

                byAddr[addr] = {
                    address : addr,
                    position: data[i][j].Location.DisplayPosition,
                    district: data[i][j].Location.Address.District
                };

                if ( counts.district[byAddr[addr].district] == null )
                    counts.district[byAddr[addr].district] = 0;

                counts.district[byAddr[addr].district]++;
            }
        }
        let bounds = { ll : { lng: null, lat: null }, ur : { lng: null, lat: null }};
        for (var addr in byAddr) {
            if ( bounds.ll.lng === null || byAddr[addr].position.Longitude < bounds.ll.lng ) bounds.ll.lng = byAddr[addr].position.Longitude;
            if ( bounds.ll.lat === null || byAddr[addr].position.Latitude  < bounds.ll.lat ) bounds.ll.lat = byAddr[addr].position.Latitude;
            if ( bounds.ur.lng === null || byAddr[addr].position.Longitude > bounds.ur.lng ) bounds.ur.lng = byAddr[addr].position.Longitude;
            if ( bounds.ur.lat === null || byAddr[addr].position.Latitude  > bounds.ur.lat ) bounds.ur.lat = byAddr[addr].position.Latitude;
        }
        console.log("Bounds2: "+JSON.stringify(bounds));
        console.log("UR: "+bounds.ur.lat+','+bounds.ur.lng);
        console.log("Counts: %s", JSON.stringify(counts));
        console.log("Number of addresses: %d", Object.keys(byAddr).length);
        fs.writeFile('addresses.json', JSON.stringify(byAddr, null, 4));
        return byAddr;
    }
);
 */
//UR: 37.38638,-122.00163


//---------------------------------------------------------------------------
function makeURL ( point, dist ) {
    return 'http://reverse.geocoder.cit.api.here.com/6.2/reversegeocode.json'
        + '?app_id='+config.Here.App_Id
        + '&app_code='+config.Here.App_Code
        + '&mode=retrieveAddresses'
        + '&gen=7'
        + '&prox='+point.lat+'%2C'+point.lng+'%2C'+dist
        + '&maxresults='+config.Here.limit;
}

//---------------------------------------------------------------------------
function makeRESTCall ( url ) {
    let resolver = Promise.pending();

    http
    .get(url, function ( response ) {
        let buffer = '';

        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {

            let data = JSON.parse(buffer);

            if ( data.Response.View.length > 1 )
                throw new Error("More than 1 view - "+url);

            if ( data.Response.View[0].Result.length > config.Here.limit )
                throw new Error("Addresses exceded the limit - "+url);

            var res = data.Response.View[0].Result.filter(function (item) {
                return item.MatchLevel === "houseNumber";
            });
            resolver.resolve(res);
        });
    })
    .on('error', function (err) { console.log("Error: "+err); });
    return resolver.promise;

}
