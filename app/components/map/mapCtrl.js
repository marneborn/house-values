(function () {
    function shiftBy ( num, min, max ) {
	var val = Math.round( 255/(max-min)*( num - min ) );
	if ( val < 0   ) return 0;
	if ( val > 255 ) return 255;
	return Math.round(val);
    }
    function toColor ( num ) {
	var s = Math.round(num).toString(16);
	if ( s.length === 0 ) s = '00';
	else if ( s.length === 1 ) s = '0'+s;
	return s;
    }
    function addCircle (map, item, funcKey, min, max) {
        var shift = shiftBy( item[funcKey], min[funcKey], max[funcKey]);
	var red   = 255 - shift;
	var green =   0 + shift;
	var blue  =   0;
	var color = '#'+toColor(red)+toColor(green)+toColor(blue);
        var circle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 0,
            fillColor: color,
            fillOpacity: 0.8,
            map: map,
            center: new google.maps.LatLng(item.location.lat, item.location.lng),
            radius: 20,
        });

        google.maps.event.addListener(circle, 'click', function (event) {
            alert(angular.toJson(item, true));
        });
        return circle;
    }

    angular
    .module('houseValuesApp')
    .controller('mapCtrl', function ($scope, $q, Config, bounds, data) {
        $scope.infoFuncs = [
            {
                title : 'price/sqft house',
                idx   : 0,
                func  : function (item) { return Math.round(item.salePrice/item.houseSize); }
            },
            {
                title : 'price/sqft lot',
                idx   : 1,
                func  : function (item) { return Math.round(item.salePrice/item.lotSize); }
            },
            {
                title : 'price/(10%*sqft of lot + 90%*sqft of house',
                idx   : 2,
                func  : function (item) {
                    var scale = 0.10;
                    return Math.round(item.salePrice/(item.lotSize*scale + item.houseSize*(1-scale)));
                }
            },
//             {
//                 title : 'price/HouseSize normalized',
//                 idx   : 3,
//                 func  : function (item, items) {
//                     items.sort(function (a, b) { return new Date(a.closeDate) - new Date(b.closeDate)});
//                     var use = [];
//                     var i=0
//                     for ( ; i<items.length; i++) {
//                         if ( items[i] === item ) break;
//                         use.push(items[i]);
//                     }
//                     i++;
//                     if ( use.length > 5 ) use = use.slice(use.length-5);
//                     var limit = i+5;
//                     if ( limit > items.length ) limit = items.length;
//                     for ( ; i<limit; i++) {
//                         use.push(items[i]);
//                     }
//                     var sum = 0;
//                     for ( var j=0; j<use.length; j++) {
//                         sum += $scope.infoFuncs[0].func(use[j]);
//                     }
//                     var avg = sum/use.length;
//                     var thisV = $scope.infoFuncs[0].func(item);
//                     return Math.round(100*(thisV-avg)/avg);
//                 }
//             }
        ];

        $scope.mapzoom = 2;
        $scope.lng     = -122.041287;
        $scope.lat     =   37.375782;

        var mapDefer = $q.defer();
        $scope.resolver = mapDefer;
        hasMap = mapDefer.promise;

        var maxDefer = $q.defer();
        var minDefer = $q.defer();
        var max = maxDefer.promise;
        var min = minDefer.promise;

        $scope.selectedFunc = $scope.infoFuncs[0];

        $q.all(data).then(function (items) {
            var maxV = {};
            var minV = {};
            for ( var i=0; i<items.length; i++ ) {
                for (var j=0; j<$scope.infoFuncs.length; j++) {
                    var info = $scope.infoFuncs[j];
                    var tmp  = info.func(items[i], items);
                    var k    = info.title;
                    items[i][k] = tmp;
                    if ( maxV[k] == null || tmp > maxV[k] ) maxV[k] = tmp;
                    if ( minV[k] == null || tmp < minV[k] ) minV[k] = tmp;
                }
            }
            maxDefer.resolve(maxV);
            minDefer.resolve(minV);
        });

        var circles  = [];
        var filtered = data;
        $scope.addShapes = function () {
            console.log(">> "+$scope.selectedFuncIdx);
            for (var i=0; i<filtered.length; i++) {

                if ( circles[i] != null )
                    circles[i].setMap(null);

                $q.all([hasMap, filtered[i], min, max])
                .then(
                    function (arr) {
                        circles.push(addCircle(arr[0], arr[1],
                                               $scope.infoFuncs[$scope.selectedFuncIdx].title,
                                               arr[2], arr[3]
                                              ));
                    }
                );
            }
        };
        $scope.selectedFuncIdx = 0;
        $scope.addShapes();

        hasMap.then (
            function (map) {
                console.log("drawn> "+map);
                var boundingBox = bounds.getBox( Config.Bounds.all );
 	        var gBBox = new google.maps.LatLngBounds(
                    new google.maps.LatLng( boundingBox.ll.lat, boundingBox.ll.lng ),
                    new google.maps.LatLng( boundingBox.ur.lat, boundingBox.ur.lng )
	        );
	        map.fitBounds(gBBox);
            }
        );
    });
})();
