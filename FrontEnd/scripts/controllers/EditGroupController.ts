/// <reference path='../interfaces/objectDefinitions.d.ts' />
/// <reference path='../enums.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

interface IEditGroupEvents {
    onSave : ()=> void ;
    onCancel : () => void;
}

interface IEditGroupScope {
    editedGroup : IGroup;
	events: IEditGroupEvents;
    isEditMode : boolean;
}


class EditGroupCtrl implements IEditGroupEvents {
    private $scope: IEditGroupScope;
    private $modalInstance : ng.ui.bootstrap.IModalServiceInstance;
    
    constructor($scope: IEditGroupScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance,  editMode: editModeEnum, group : IGroup) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.editedGroup = group;
        this.$scope.isEditMode = false;        
        if (editMode == editModeEnum.EditItem) {
            this.$scope.isEditMode = true;
        }
        this.$modalInstance = $modalInstance;
	}
    
    
    public onSave() {
        this.$modalInstance.close(this.$scope.editedGroup);
    }
    
    public onCancel() {
        this.$modalInstance.dismiss();
    }
   
 
}