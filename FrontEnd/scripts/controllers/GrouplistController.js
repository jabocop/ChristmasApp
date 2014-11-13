/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />
/// <reference path='../enums.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var GrouplistCtrl = (function (_super) {
    __extends(GrouplistCtrl, _super);
    function GrouplistCtrl($scope, $http, loginFactory, alertFactory, $modal) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$modal = $modal;
        this.alertFactory = alertFactory;

        $scope.events = this;
        this.getGrouplist();
    }
    GrouplistCtrl.prototype.getEmptyGroup = function () {
        var retval = {
            _id: null,
            name: "",
            users: null
        };
        return retval;
    };

    GrouplistCtrl.prototype.getGrouplist = function () {
        var _this = this;
        this.loginFactory.user._id;
        this.$http.get('/listGroupsByUser', { params: { userId: this.loginFactory.user._id } }).success(function (data, status) {
            _this.$scope.groups = data;
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to list groups");
        });
    };

    GrouplistCtrl.prototype.saveGroup = function (group) {
        var _this = this;
        var functionToCall = 'addGroup';
        var dataToSave = { group: group, userId: this.loginFactory.user._id };
        this.$http.post(functionToCall, dataToSave).success(function (data, status) {
            //Succesful. Refresh the list.
            _this.getGrouplist();
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to save group");
        });
    };

    GrouplistCtrl.prototype.openEditGroupModal = function (group, newGroup) {
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

    GrouplistCtrl.prototype.cretateGroup = function () {
        this.openEditGroupModal(this.getEmptyGroup(), true);
    };
    return GrouplistCtrl;
})(BaseController);
