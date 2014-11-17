/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var NewUserCtrl = (function (_super) {
    __extends(NewUserCtrl, _super);
    function NewUserCtrl(loginFactory, $scope, alertFactory) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.alertFactory = alertFactory;
        this.$scope.isNewUser = this.internalIsNewUser();
        this.$scope.editedUser = this.getEmptyUser();
        $scope.password2 = null;
        $scope.events = this;
    }
    NewUserCtrl.prototype.getEmptyUser = function () {
        return {
            _id: null,
            email: null,
            name: null,
            password: null };
    };

    NewUserCtrl.prototype.internalIsNewUser = function () {
        return true;
    };

    NewUserCtrl.prototype.submit = function () {
        if (!this.$scope.editedUser.password || this.$scope.password2 !== this.$scope.editedUser.password) {
            this.alertFactory.addAlert(2 /* Warning */, "Password must be entered and be matched.");
        } else {
            this.loginFactory.newUser(this.$scope.editedUser);
        }
    };
    return NewUserCtrl;
})(BaseController);

var EditUserCtrl = (function (_super) {
    __extends(EditUserCtrl, _super);
    function EditUserCtrl(loginFactory, $scope, alertFactory) {
        _super.call(this, loginFactory, $scope, alertFactory);
        $scope.editedUser = {
            _id: this.loginFactory.user._id,
            email: this.loginFactory.user.email,
            name: this.loginFactory.user.name,
            password: null
        };
    }
    EditUserCtrl.prototype.internalIsNewUser = function () {
        return false;
    };

    EditUserCtrl.prototype.submit = function () {
        if (!this.$scope.editedUser.password || this.$scope.password2 !== this.$scope.editedUser.password) {
            this.alertFactory.addAlert(2 /* Warning */, "Password must be entered and be matched.");
        } else {
            this.loginFactory.editUser(this.$scope.editedUser);
        }
    };
    return EditUserCtrl;
})(NewUserCtrl);
