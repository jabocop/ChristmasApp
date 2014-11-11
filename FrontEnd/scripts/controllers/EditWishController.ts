/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

interface IEditWishEvents {
    onSave : ()=> void ;
    onCancel : () => void;
}

interface IEditWishScope {
    editedWish : IWish;
	events: IEditWishEvents;
    isEditMode : boolean;
    
}

enum editModeEnum {
    None,
    NewItem,
    EditItem
}



class EditWishCtrl implements IEditWishEvents {
    private $scope: IEditWishScope;
    private $modalInstance : ng.ui.bootstrap.IModalServiceInstance;
    
    constructor($scope: IEditWishScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance,  editMode: editModeEnum, wish : IWish) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.editedWish = wish;
        this.$scope.isEditMode = false;        
        if (editMode == editModeEnum.EditItem) {
            this.$scope.isEditMode = true;
        }
        this.$modalInstance = $modalInstance;
	}
    
    
    public onSave() {
        this.$modalInstance.close(this.$scope.editedWish);
    }
    
    public onCancel() {
        this.$modalInstance.dismiss();
    }
   
 
}
