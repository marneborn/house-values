"use strict";

let Promise  = require('bluebird');
let http     = require('http');
let fs       = require('fs');
let isInPoly = require('./isInPoly');

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

let cstr = '';
let vstr = '';
let addresses = JSON.parse(fs.readFileSync('addresses.json'));
let count = { in: 0, out: 0, cumberland: 0, vargas: 0, total: 0 };
for (var addr in addresses ) {
    count.total++;
    if ( !isInPoly(addresses[addr].position, allBound) ) {
        count.out++;
        continue;
    }

    count.in++;
    if ( isInPoly(addresses[addr].position, cumberlandBound) ) {
        count.cumberland++;
        cstr += addr + "\n";
    }
    else {
        count.vargas++;
        vstr += addr + "\n";
    }
}
console.log(">> "+JSON.stringify(count));
fs.writeFile('cHouses.txt', cstr);
fs.writeFile('vHouses.txt', vstr);
