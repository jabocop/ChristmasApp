/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='typings/angularjs/angular-route.d.ts' />
/// <reference path='controllers/main.ts' />
/// <reference path='controllers/about.ts' />
/// <reference path='controllers/login.ts' />
/// <reference path='factories/authInterceptor.ts' />
var christmasApp;
(function (christmasApp) {
    'use strict';

    var ChristmasApp = angular.module('ChristmasApp', ['ngRoute']).controller("MainCtrl", MainCtrl).controller("AboutCtrl", AboutCtrl).controller("LoginCtrl", LoginCtrl).config(function ($routeProvider, $httpProvider) {
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
        $httpProvider.interceptors.push(authInterceptor.Factory);
    });
})(christmasApp || (christmasApp = {}));
