'use strict';

/**
 * @ngdoc function
 * @name zillowApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zillowApp
 */
angular.module('zillowApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
