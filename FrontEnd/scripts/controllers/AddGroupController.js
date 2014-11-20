/// <reference path='../interfaces/objectDefinitions.d.ts' />
/// <reference path='../enums.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

var AddGroupCtrl = (function () {
    function AddGroupCtrl($scope, $modalInstance, group) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.addedGroup = group;
        this.$modalInstance = $modalInstance;
    }
    AddGroupCtrl.prototype.onSave = function () {
        this.$modalInstance.close(this.$scope.addedGroup);
    };

    AddGroupCtrl.prototype.onCancel = function () {
        this.$modalInstance.dismiss();
    };
    return AddGroupCtrl;
})();
