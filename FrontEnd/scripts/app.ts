/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='typings/angularjs/angular-route.d.ts' />
/// <reference path='controllers/main.ts' />
/// <reference path='controllers/about.ts' />

module christmasApp {
  'use strict';


    var ChristmasApp = angular.module('ChristmasApp', ['ngRoute'])
        .controller("MainCtrl", MainCtrl)
        .controller("AboutCtrl", AboutCtrl)
        .config(($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });


}
