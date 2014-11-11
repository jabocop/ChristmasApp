/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../factories/loginFactory.ts' />

var BaseController = (function () {
    function BaseController($scope, loginFactory) {
        this.baseScope = $scope;
        this.loginFactory = loginFactory;
        this.baseScope.loginFactory = loginFactory;
    }
    return BaseController;
})();
