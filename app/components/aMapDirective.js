angular.module('aGMap', [])
.provider("aGMap", function() {
    var apiKey = '';
    return {
        $get: function () {
            return: {
                apiKey: apiKey
            };
        },
        setApiKey = function (key) {
            apiKey = key;
        }
    };
})
.run(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialize';
    document.body.appendChild(script);
})
.directive('aGMap', function() {
	var mapid = 1;
	return {
		restrict: 'E',
		link: function (scope, element, attrs, ctrl) {
			var el = document.createElement("div");
			el.style.width = "100%";
			el.style.height = "100%";
			element.prepend(el);
			var mapOptions = {
					center: new google.maps.LatLng(0,0),
					zoom  : 1
			};
			var map = new google.maps.Map(el, mapOptions);
			map.id = mapid++;
			google.maps.event.addListener(map, 'tilesloaded', function () {
				google.maps.event.clearListeners(map, 'tilesloaded');
				if ( scope.mapDefer )
					scope.mapDefer.resolve(map);
				return;
			});
		}
	};
})
