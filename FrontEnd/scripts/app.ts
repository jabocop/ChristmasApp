/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='typings/angularjs/angular-route.d.ts' />
/// <reference path='controllers/main.ts' />
/// <reference path='controllers/about.ts' />
/// <reference path='controllers/login.ts' />
/// <reference path='controllers/HeaderController.ts' />
/// <reference path='controllers/WishlistController.ts' />
/// <reference path='controllers/EditGroupController.ts' />
/// <reference path='controllers/GroupController.ts' />
/// <reference path='controllers/YesNoModalController.ts' />
/// <reference path='factories/authInterceptor.ts' />
/// <reference path='factories/alertFactory.ts' />


module christmasApp {
  'use strict';


    var ChristmasApp = angular.module('ChristmasApp', ['ngRoute','ui.bootstrap'])
        .controller("MainCtrl", MainCtrl)
        .controller("AboutCtrl", AboutCtrl)
        .controller("LoginCtrl", LoginCtrl)
        .controller("HeaderController", HeaderController)
        .controller("WishlistCtrl", WishlistCtrl)
        .controller("MyWishlistCtrl", MyWishListCtrl)
        .controller("EditWishCtrl",EditWishCtrl)
        .controller("EditGroupCtrl",EditGroupCtrl)
        .controller("GroupCtrl",GroupCtrl)
        .controller("YesNoModalCtrl",YesNoModalCtrl)
        .factory("alertFactory", () => new alertFactory())
        .factory("loginFactory", ($http,$window,$location,alertFactory) => new loginFactory($http,$window,$location,alertFactory))
        
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
                    templateUrl: 'views/wishlist.html',
                    controller: 'WishlistCtrl'                        
                })
                .when('/myWishList', {
                    templateUrl: 'views/wishlist.html',
                    controller: 'MyWishlistCtrl'                        
                })
                .when('/group/:groupId', {
                    templateUrl: 'views/group.html',
                    controller: 'GroupCtrl'                        
                })
                .otherwise({
                    redirectTo: '/'
                });
            $httpProvider.interceptors.push(authInterceptor.Factory);
        });


}
