/// <reference path='../typings/angularjs/angular.d.ts' />

var BaseController = (function () {
    function BaseController($scope) {
        this.baseScope = $scope;
    }
    return BaseController;
})();
