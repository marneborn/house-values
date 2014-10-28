'use strict';

/**
 * @ngdoc overview
 * @name houseValuesApp
 * @description
 * # houseValuesApp
 *
 * Main module of the application.
 */
angular
.module('houseValuesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'aGMap'
])
.config(function ($routeProvider, aGMapProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .when('/map', {
        templateUrl: 'components/map/map.partial.html',
        controller: 'mapCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

    aGMapProvider.setApiKey('AIzaSyDWBzVOYyJp6EPCGLZcavUJlEII1Ds5loI');
});
