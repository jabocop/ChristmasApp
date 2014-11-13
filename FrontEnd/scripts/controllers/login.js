/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var LoginCtrl = (function (_super) {
    __extends(LoginCtrl, _super);
    function LoginCtrl(loginFactory, alertFactory, $scope, $http, $window) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        this.alertFactory = alertFactory;
        $scope.loginUser = null;
        $scope.message = '';
        $scope.events = this;
    }
    LoginCtrl.prototype.submit = function () {
        this.loginFactory.Login(this.$scope.loginUser);
        this.$scope.loginUser = null;
    };

    LoginCtrl.prototype.callRestricted = function () {
        var _this = this;
        this.$http({ url: '/api/restricted', method: 'GET' }).success(function (data, status, headers, config) {
            _this.$scope.message = _this.$scope.message + ' ' + data.name; // Should log 'foo'
        }).error(function (data, status, headers, config) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to call restricted area");
        });
    };
    return LoginCtrl;
})(BaseController);
