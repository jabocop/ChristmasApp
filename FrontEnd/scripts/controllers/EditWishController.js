/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

var editModeEnum;
(function (editModeEnum) {
    editModeEnum[editModeEnum["None"] = 0] = "None";
    editModeEnum[editModeEnum["NewItem"] = 1] = "NewItem";
    editModeEnum[editModeEnum["EditItem"] = 2] = "EditItem";
})(editModeEnum || (editModeEnum = {}));

var EditWishCtrl = (function () {
    function EditWishCtrl($scope, $modalInstance, editMode, wish) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.editedWish = wish;
        this.$scope.isEditMode = false;
        if (editMode == 2 /* EditItem */) {
            this.$scope.isEditMode = true;
        }
        this.$modalInstance = $modalInstance;
    }
    EditWishCtrl.prototype.onSave = function () {
        this.$modalInstance.close(this.$scope.editedWish);
    };

    EditWishCtrl.prototype.onCancel = function () {
        this.$modalInstance.dismiss();
    };
    return EditWishCtrl;
})();
