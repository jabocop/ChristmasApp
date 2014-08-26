'use strict';

/**
 * @ngdoc function
 * @name testApaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApaApp
 */
angular.module('ChristmasApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
