'use strict';

/**
 * @ngdoc overview
 * @name testApaApp
 * @description
 * # testApaApp
 *
 * Main module of the application.
 */
angular
  .module('ChristmasApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
