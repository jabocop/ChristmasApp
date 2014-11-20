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

var EditGroupCtrl = (function (_super) {
    __extends(EditGroupCtrl, _super);
    function EditGroupCtrl(loginFactory, $routeParams, $scope, alertFactory, $http) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.alertFactory = alertFactory;
        this.$scope.editedGroup = null;
        this.$http = $http;
        $scope.events = this;
    }
    EditGroupCtrl.prototype.loadGroup = function (id) {
        var _this = this;
        this.$http.get('/getGroup', { params: { groupId: id } }).success(function (data, status) {
            _this.$scope.editedGroup = data;
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to fetch group");
        });
    };

    EditGroupCtrl.prototype.update = function () {
        var _this = this;
        this.$http.post('saveGroup', this.$scope.editedGroup).success(function (data, status) {
            _this.$scope.editedGroup = data;
            _this.alertFactory.addAlert(0 /* Success */, "Group saved");
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to save group");
        });
    };

    EditGroupCtrl.prototype.remove = function () {
        var _this = this;
        //TODO: Are you sure
        this.$http.post('removeGroup', this.$scope.editedGroup).success(function (data, status) {
            _this.alertFactory.addAlert(0 /* Success */, "Group removed");
            //TODO: redirect to startpage
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to remove group");
        });
    };

    EditGroupCtrl.prototype.invite = function () {
        var _this = this;
        this.$http.post('inviteToGroup', { groupId: this.$scope.editedGroup._id, mail: this.$scope.email }).success(function (data, status) {
            _this.alertFactory.addAlert(0 /* Success */, "Mail sent to " + _this.$scope.email);
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to send mail");
        });
    };
    return EditGroupCtrl;
})(BaseController);
