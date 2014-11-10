/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='typings/angularjs/angular-route.d.ts' />
/// <reference path='controllers/main.ts' />
/// <reference path='controllers/about.ts' />
/// <reference path='controllers/login.ts' />
/// <reference path='factories/authInterceptor.ts' />
/// <reference path='factories/alertFactory.ts' />

module christmasApp {
  'use strict';


    var ChristmasApp = angular.module('ChristmasApp', ['ngRoute','ui.bootstrap'])
        .controller("MainCtrl", MainCtrl)
        .controller("AboutCtrl", AboutCtrl)
        .controller("LoginCtrl", LoginCtrl)
        .controller("HeaderController", HeaderController)
        .factory("loginFactory", ($http,$window,$location) => new loginFactory($http,$window,$location))
        .factory("alertFactory", () => new alertFactory())
        .config(($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider) => {
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
                .when('/newUser', {
                    templateUrl: 'views/newUser.html',
                    controller: 'NewUserCtrl'
                })
                .when('/wishList/:userId', {
                    templateUrl: 'views/wishList.html',
                    controller: 'WishlistCtrl'                        
                })
                .otherwise({
                    redirectTo: '/'
                });
            $httpProvider.interceptors.push(authInterceptor.Factory);
        });


}
