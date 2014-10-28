angular
.module('houseValuesApp')
.factory('bounds', function () {
    return {
        isWithin : function (point, poly) {
            var bounds = getBounds(poly);
            var ray    = [point, { lat: point['lat'], lng: bounds.ur.lng+(bounds.ur.lng-bounds.ll.lng) } ];
            var count  = 0;
            for (var i=1; i<poly.length; i++) {
                var line  = [poly[i-1], poly[i]];

                if ( line[0].lat > ray[0].lat && line[1].lat > ray[0].lat ) {
                    continue;
                }
                if ( line[0].lat < ray[0].lat && line[1].lat < ray[0].lat ) {
                    continue;
                }

                // if the point is on point0, say that it intersects.
                // if it is on point1, then it doesn't. This makes things on corners be inside.
                if ( line[0].lat === point.lat && line[0].lng === point.lng ) {
                    count++;
                    continue;
                }
                if ( line[1].lat === point.lat && line[1].lng === point.lng ) {
                    continue;
                }

                var slope = (line[0].lat - line[1].lat)/(line[0].lng - line[1].lng);
                var longAtLat = (ray[0].lat - line[0].lat)/slope + line[0].lng;
                if ( longAtLat >= ray[0].lng && longAtLat <= ray[1].lat ) {
                    count++;
                }
            }
            return !!(count % 2);
        },

        getBox : function ( poly ) {
            var bounds = {
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
    };
});
