"use strict";

let http = require('http');
let xml2json = require('xml2json');
let fs = require('fs');
var LineByLineReader = require('line-by-line');
let EventEmitter = require('events').EventEmitter;
let extend = require('extend');
let util = require('util');
let ZILLOW_ID = 'X1-ZWz1b29aw4bf2j_56tmg';

getData('vargas.address')
.on('done', function (data) {
    var str = '';
    for (let addr in data) {
        str += ["address", "lastSoldPrice", "lastSoldDate", "bathrooms", "bedrooms", "lotSizeSqFt", "finishedSqFt" ]
        .map(function (k) { console.log("x> "+k+' - '+data[addr][k]); return data[addr][k]; }).join("\t")+"\n";
    }
    //console.log(JSON.stringify(data, null, 4));
    fs.writeFileSync('vargas.output', str);
});

// getData('cumberland.address')
// .on('done', function (data) {
//     var str = '';
//     for (let addr in data) {
//         str += ["address", "lastSoldPrice", "lastSoldDate", "bathrooms", "bedrooms", "lotSizeSqFt", "finishedSqFt" ]
//         .map(function (k) { return data[k]; }).join("\t")+"\n";
//     }
//     fs.writeFileSync('cumberland.output', str);
// });


function getData( file ) {
    let alldata = {};
    var emitter = new EventEmitter();
    var lr = new LineByLineReader(file);
    var outstanding = 0;
    var lrdone      = false;
    let ws = fs.createWriteStream('tmp.out');
    lr.on('line', function (line) {
        outstanding++;
        let url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm'
            +'?zws-id='+ZILLOW_ID
                +line;

        http
        .get(url, function ( response ) {
            let buffer = '';

            response.on("data", function (chunk) {
                buffer += chunk;
            });

            response.on("end", function (err) {
                outstanding--;
                console.log("outstanding="+outstanding);
                let data = JSON.parse(xml2json.toJson(buffer));
                ws.write(JSON.stringify(data, null, 4)+"\n");
                data = data["SearchResults:searchresults"];
                let result = util.isArray(data.response.results.result)
                ? data.response.results.result[0] : data.response.results.result;
                alldata[data.request.address] = {
                    address : data.request.address,
                    lastSoldPrice : result.lastSoldPrice["$t"]
                };

                ['lastSoldDate', 'bathrooms', 'bedrooms', 'lotSizeSqFt', 'finishedSqFt']
                .map(function (a) {
                    alldata[data.request.address][a] = result[a];
                });
                if ( outstanding === 0 && lrdone ) {
                    emitter.emit('done', alldata);
                    ws.end();
                }
            });
        });

    });

    lr.on('end', function () {
        console.log("lrend");
        lrdone = true;
    });
    return emitter;
}
