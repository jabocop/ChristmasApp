/// <reference path='../interfaces/objectDefinitions.d.ts' />
/// <reference path='../enums.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

var EditGroupCtrl = (function () {
    function EditGroupCtrl($scope, $modalInstance, editMode, group) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.editedGroup = group;
        this.$scope.isEditMode = false;
        if (editMode == 2 /* EditItem */) {
            this.$scope.isEditMode = true;
        }
        this.$modalInstance = $modalInstance;
    }
    EditGroupCtrl.prototype.onSave = function () {
        this.$modalInstance.close(this.$scope.editedGroup);
    };

    EditGroupCtrl.prototype.onCancel = function () {
        this.$modalInstance.dismiss();
    };
    return EditGroupCtrl;
})();
