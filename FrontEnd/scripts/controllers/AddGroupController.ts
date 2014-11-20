/// <reference path='../interfaces/objectDefinitions.d.ts' />
/// <reference path='../enums.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

interface IAddGroupEvents {
    onSave : ()=> void ;
    onCancel : () => void;
}

interface IAddGroupScope {
    addedGroup : IGroup;
	events: IAddGroupEvents;
}


class AddGroupCtrl implements IAddGroupEvents {
    private $scope: IAddGroupScope;
    private $modalInstance : ng.ui.bootstrap.IModalServiceInstance;
    
    constructor($scope: IAddGroupScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, group : IGroup) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.addedGroup = group;
        this.$modalInstance = $modalInstance;
	}
    
    
    public onSave() {
        this.$modalInstance.close(this.$scope.addedGroup);
    }
    
    public onCancel() {
        this.$modalInstance.dismiss();
    }
   
 
}