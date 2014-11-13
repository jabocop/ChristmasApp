/// <reference path='BaseController.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
/// <reference path='../enums.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var HeaderController = (function (_super) {
    __extends(HeaderController, _super);
    function HeaderController($scope, $location, loginFactory, alertFactory, $modal, $http) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        $scope.events = this;
        this.$scope.alertFactory = alertFactory;
        this.$location = $location;
        this.$modal = $modal;
        this.$http = $http;
        this.$scope.isActive = function (viewLocation) {
            if (viewLocation === "/") {
                return $location.path() == viewLocation;
            }
            return $location.path().indexOf(viewLocation) >= 0;
        };
    }
    HeaderController.prototype.getEmptyGroup = function () {
        var retval = {
            _id: null,
            name: "",
            users: null
        };
        return retval;
    };

    HeaderController.prototype.saveGroup = function (group) {
        var _this = this;
        var functionToCall = 'addGroup';
        var dataToSave = { group: group, userId: this.loginFactory.user._id };
        this.$http.post(functionToCall, dataToSave).success(function (data, status) {
            //Succesful. Refresh the list.
            _this.loginFactory.refreshGroups();
        }).error(function (data, status) {
            _this.$scope.alertFactory.addAlert(3 /* Danger */, "Failed to save group");
        });
    };

    HeaderController.prototype.openEditGroupModal = function (group, newGroup) {
        var _this = this;
        var mode = 1 /* NewItem */;
        if (!newGroup) {
            mode = 2 /* EditItem */;
        }

        var options = {
            templateUrl: 'views/editGroupModal.html',
            controller: 'EditGroupCtrl',
            resolve: {
                editMode: function () {
                    return mode;
                },
                group: function () {
                    return group;
                }
            }
        };
        var modal = this.$modal.open(options);
        modal.result.then(function (group) {
            _this.saveGroup(group);
        });
    };

    HeaderController.prototype.createGroup = function () {
        this.openEditGroupModal(this.getEmptyGroup(), true);
    };
    return HeaderController;
})(BaseController);
