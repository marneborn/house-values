'use strict';

/**
 * @ngdoc function
 * @name zillowApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the zillowApp
 */
angular.module('zillowApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
