/// <reference path='BaseController.ts' />
/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

var editMode;
(function (editMode) {
    editMode[editMode["None"] = 0] = "None";
    editMode[editMode["NewItem"] = 1] = "NewItem";
    editMode[editMode["EditItem"] = 2] = "EditItem";
})(editMode || (editMode = {}));

var EditWishCtrl = (function () {
    function EditWishCtrl($scope, $modalInstance, editMode, wish) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.editedWish = wish;
        this.$scope.editMode = editMode;
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
