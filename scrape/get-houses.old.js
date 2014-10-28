"use strict";

let Promise  = require('bluebird');
let http     = require('http');
let fs       = require('fs');

let HERE = {
    App_Id   : 'Cm73HO53L1jBo0R3p6UT',
    App_Code : 'nrzv7qcuRevIcVu_BmS4Zg'
};

let cumberlandBound = [
    { lat: 37.371832, lng: -122.048498 },
    { lat: 37.378720, lng: -122.046181 },
    { lat: 37.378567, lng: -122.045022 },
    { lat: 37.378738, lng: -122.043563 },
    { lat: 37.376828, lng: -122.034443 },
    { lat: 37.369137, lng: -122.037018 },
    { lat: 37.371832, lng: -122.048498 }
];

let allBound = [
    { lat: 37.373815, lng: -122.056274 },
    { lat: 37.385444, lng: -122.052368 },
    { lat: 37.379340, lng: -122.033486 },
    { lat: 37.369109, lng: -122.036876 },
    { lat: 37.373815, lng: -122.056274 }
];




// 37.385515, -122.033714
// Bounds: {"ll":{"x":-122.05834,"y":37.37202},
//          "ur":{"x":-122.01054,"y":37.38439}}

let addresses = {};

let bounds = getBounds(allBound);
console.log("Bounds: "+JSON.stringify(bounds));
//process.exit();
//let step = { lng:0.0004, lat:0.0002 };
let step = { lng:0.000004, lat:0.000002 };
// 37.373875, -122.056318
// 37.372954, -122.052842
// 37.375998, -122.055610

var promises = [];
var point = { lat: bounds.ll.lat, lng: bounds.ll.lng };
var count = 10;
var stepsTaken = { lng:0, lat:0, prevlng:0 };

while ( point.lat < bounds.ur.lat ) {
    promises.push(makeRESTCall( makeURL(point, 500) ));
    point.lng += step.lng;
    stepsTaken.lng++;
    if ( point.lng > bounds.ur.lng ) {
        point.lng  = bounds.ll.lng;
        point.lat += step.lat;
        stepsTaken.prevlng = (stepsTaken.lng > stepsTaken.prevlng ) ? stepsTaken.lng : stepsTaken.prevlng;
        stepsTaken.lng = 0;
        stepsTaken.lat++;
    }
}

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
        console.log("Bounds: "+JSON.stringify(bounds));
        console.log("UR: "+bounds.ur.lat+','+bounds.ur.lng);
        console.log("Counts: %s", JSON.stringify(counts));
        console.log("Number of addresses: %d", Object.keys(byAddr).length);
        fs.writeFile('addresses.json', JSON.stringify(byAddr, null, 4));
        return byAddr;
    }
);
//UR: 37.38638,-122.00163


//---------------------------------------------------------------------------
function makeURL ( point, dist ) {
    return 'http://reverse.geocoder.cit.api.here.com/6.2/reversegeocode.json'
        + '?app_id='+HERE.App_Id
        + '&app_code='+HERE.App_Code
        + '&mode=retrieveAddresses'
        + '&gen=7'
        + '&prox='+point.lat+'%2C'+point.lng+'%2C'+dist
        + '&maxresults=100';
}

//---------------------------------------------------------------------------
function getBounds ( poly ) {
    let bounds = {
        ll : { lng:null, lat: null},
        ur : { lng:null, lat: null}
    };
    for (var i=0; i<poly.length; i++) {
        if ( bounds.ll.lng === null || poly[i].lng < bounds.ll.lng ) bounds.ll.lng = poly[i].lng;
        if ( bounds.ll.lat === null || poly[i].lat < bounds.ll.lat ) bounds.ll.lat = poly[i].lat;
        if ( bounds.ur.lng === null || poly[i].lng > bounds.ur.lng ) bounds.ur.lng = poly[i].lng;
        if ( bounds.ur.lat === null || poly[i].lat > bounds.ur.lat ) bounds.ur.lat = poly[i].lat;
    }
    return bounds;
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

            if ( data.Response.View[0].Result.length > HERE.limit )
                throw new Error("Addresses exceded the limit - "+url);

            var res = data.Response.View[0].Result.filter(function (item) {
                return item.MatchLevel === "houseNumber";
            });

            resolver.resolve(res);
//             resolver.resolve(data.Response.View[0].Result);
        });
    });
    return resolver.promise;
}
