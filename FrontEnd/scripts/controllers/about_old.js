'use strict';

/**
 * @ngdoc function
 * @name testApaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testApaApp
 */
angular.module('ChristmasApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
