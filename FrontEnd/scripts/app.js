/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='typings/angularjs/angular-route.d.ts' />
/// <reference path='controllers/main.ts' />
/// <reference path='controllers/about.ts' />
/// <reference path='controllers/login.ts' />
/// <reference path='controllers/HeaderController.ts' />
/// <reference path='controllers/WishlistController.ts' />
/// <reference path='controllers/AddGroupController.ts' />
/// <reference path='controllers/editUserController.ts' />
/// <reference path='controllers/GroupController.ts' />
/// <reference path='controllers/JoinGroupController.ts' />
/// <reference path='controllers/YesNoModalController.ts' />
/// <reference path='factories/authInterceptor.ts' />
/// <reference path='factories/alertFactory.ts' />
var christmasApp;
(function (christmasApp) {
    'use strict';

    var ChristmasApp = angular.module('ChristmasApp', ['ngRoute', 'ui.bootstrap']).controller("MainCtrl", MainCtrl).controller("AboutCtrl", AboutCtrl).controller("LoginCtrl", LoginCtrl).controller("EditUserCtrl", EditUserCtrl).controller("NewUserCtrl", NewUserCtrl).controller("HeaderController", HeaderController).controller("WishlistCtrl", WishlistCtrl).controller("MyWishlistCtrl", MyWishListCtrl).controller("EditWishCtrl", EditWishCtrl).controller("AddGroupCtrl", AddGroupCtrl).controller("JoinGroupCtrl", JoinGroupCtrl).controller("GroupCtrl", GroupCtrl).controller("YesNoModalCtrl", YesNoModalCtrl).factory("alertFactory", function () {
        return new alertFactory();
    }).factory("loginFactory", function ($http, $window, $location, alertFactory) {
        return new loginFactory($http, $window, $location, alertFactory);
    }).config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).when('/newUser', {
            templateUrl: 'views/editUser.html',
            controller: 'NewUserCtrl'
        }).when('/editUser/', {
            templateUrl: 'views/editUser.html',
            controller: 'EditUserCtrl'
        }).when('/wishList/:userId', {
            templateUrl: 'views/wishlist.html',
            controller: 'WishlistCtrl'
        }).when('/myWishList', {
            templateUrl: 'views/wishlist.html',
            controller: 'MyWishlistCtrl'
        }).when('/group/:groupId', {
            templateUrl: 'views/group.html',
            controller: 'GroupCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        $httpProvider.interceptors.push(authInterceptor.Factory);
    });
})(christmasApp || (christmasApp = {}));
