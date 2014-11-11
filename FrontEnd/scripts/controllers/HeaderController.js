/// <reference path='BaseController.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../factories/loginFactory.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var HeaderController = (function (_super) {
    __extends(HeaderController, _super);
    function HeaderController($scope, $location, loginFactory, alertFactory) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.$scope.alertFactory = alertFactory;
        this.$location = $location;
        this.$scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
    return HeaderController;
})(BaseController);
