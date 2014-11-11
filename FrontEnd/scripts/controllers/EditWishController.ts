/// <reference path='BaseController.ts' />
/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

interface IEditWishEvents {
    onSave : ()=> void ;
    onCancel : () => void;
}

interface IEditWishScope extends IBaseScope {
    editedWish : IWish;
	events: IEditWishEvents;
    editMode : editMode;
}

enum editMode {
    None,
    NewItem,
    EditItem
}



class EditWishCtrl implements IEditWishEvents {
    private $scope: IEditWishScope;
    private $modalInstance : ng.ui.bootstrap.IModalServiceInstance;
    
    constructor($scope: IEditWishScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance,  editMode: editMode, wish : IWish) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.editedWish = wish;
        this.$scope.editMode = editMode;
        this.$modalInstance = $modalInstance;
	}
    
    
    public onSave() {
        this.$modalInstance.close(this.$scope.editedWish);
    }
    
    public onCancel() {
        this.$modalInstance.dismiss();
    }
   
 
}
