/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var GroupCtrl = (function (_super) {
    __extends(GroupCtrl, _super);
    function GroupCtrl($scope, $routeParams, $http, loginFactory, alertFactory) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.alertFactory = alertFactory;

        $scope.events = this;
        this.groupId = $routeParams.groupId;
        this.getGroup();
    }
    GroupCtrl.prototype.getGroup = function () {
        var _this = this;
        if (this.groupId !== undefined) {
            this.$http.get('/getGroupWithUsers', { params: { groupId: this.groupId } }).success(function (data, status) {
                _this.$scope.group = data;
            }).error(function (data, status) {
                _this.alertFactory.addAlert(3 /* Danger */, "Failed to list users");
            });
        }
    };

    GroupCtrl.prototype.userSelected = function (user) {
    };
    return GroupCtrl;
})(BaseController);
