/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='typings/angularjs/angular-route.d.ts' />
/// <reference path='controllers/main.ts' />
/// <reference path='controllers/about.ts' />
var christmasApp;
(function (christmasApp) {
    'use strict';

    var ChristmasApp = angular.module('ChristmasApp', ['ngRoute']).controller("MainCtrl", MainCtrl).controller("AboutCtrl", AboutCtrl).config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    });
})(christmasApp || (christmasApp = {}));
