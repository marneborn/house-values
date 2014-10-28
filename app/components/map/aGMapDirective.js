

window.onload = function () { console.log("onload"); };

angular.module('aGMap', [])
.provider('aGMap', function() {
    var apiKey = 'foo';
    var loaded = false;
    return {
        $get: function ($q) {
            return {
                loadScript : function () {
                    console.log("loading");
                    if (loaded) return;
                    loaded = true;
                    var defer = $q.defer();
                    window.resolveMe = function () { console.log("loaded"); defer.resolve(true) };
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
                        + '&key='+apiKey
                        + '&callback=resolveMe';
                    document.body.appendChild(script);
                    return defer.promise;
                }
            };
        },
        setApiKey : function (key) {
            apiKey = key;
        }
    };
})
.directive('aMap', function(aGMap) {
    var loadPromise = aGMap.loadScript();
    var mapid = 1;
    return {
	restrict: 'E',
        scope: {
            latitude   : '@?',
            longitude  : '@?',
            mapzoom    : '@?',
            resolver   : '=?'
        },
	link: function (scope, element, attrs, ctrl) {
	    var el = document.createElement("div");
	    el.style.width = "100%";
	    el.style.height = "100%";
	    element.prepend(el);
            if ( scope.latitude  === undefined ) scope.latitude  = 0;
            if ( scope.longitude === undefined ) scope.longitude = 0;
            if ( scope.mapzoom   === undefined ) scope.mapzoom   = 1;
            loadPromise
            .then(
                function () {
	            var mapOptions = {
		        center: new google.maps.LatLng(scope.latitude, scope.longitude),
		        zoom  : Number(scope.mapzoom)
	            };
	            var map = new google.maps.Map(el, mapOptions);
	            map.id = mapid++;
	            google.maps.event.addListener(map, 'tilesloaded', function () {
		        google.maps.event.clearListeners(map, 'tilesloaded');
                        if ( scope.resolver )
                            scope.resolver.resolve(map)
		        return;
	            });
                }
            );
	}
    };
});
