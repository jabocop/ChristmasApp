/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var NewUserCtrl = (function (_super) {
    __extends(NewUserCtrl, _super);
    function NewUserCtrl(loginFactory, $scope) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.loginFactory = loginFactory;
        $scope.newUser = null;
        $scope.password2 = null;
        $scope.events = this;
    }
    NewUserCtrl.prototype.submit = function () {
        this.loginFactory.NewUser(this.$scope.newUser);
    };
    return NewUserCtrl;
})(BaseController);
