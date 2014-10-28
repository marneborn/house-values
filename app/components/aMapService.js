angular.module('AMap', [])
.directive('aMap', function() {
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
