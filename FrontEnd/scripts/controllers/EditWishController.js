/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
/// <reference path='../Enums.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />

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
