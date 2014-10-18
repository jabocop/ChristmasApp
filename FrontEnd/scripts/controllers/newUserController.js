/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var NewUserCtrl = (function (_super) {
    __extends(NewUserCtrl, _super);
    function NewUserCtrl(loginFactory, $scope, $http) {
        _super.call(this, $scope);
        this.$scope = $scope;
        this.$http = $http;
        this.loginFactory = loginFactory;
        $scope.user = null;
        $scope.password2 = null;
        $scope.events = this;
        $scope.loginFactory = loginFactory;
    }
    NewUserCtrl.prototype.submit = function () {
        this.loginFactory.NewUser(this.$scope.user);
    };
    return NewUserCtrl;
})(BaseController);
