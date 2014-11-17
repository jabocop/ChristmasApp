/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

interface IJoinGroupEvents {
    onOk : ()=> void ;
    onCancel : () => void;
}

interface IJoinGroupScope {
    key : string;
	events: IJoinGroupEvents;
}


class JoinGroupCtrl implements IJoinGroupEvents {
    private $scope: IJoinGroupScope;
    private $modalInstance : ng.ui.bootstrap.IModalServiceInstance;
    
    constructor($scope: IJoinGroupScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$modalInstance = $modalInstance;
	}
    
    
    public onOk() {
        this.$modalInstance.close(this.$scope.key);
    }
    
    public onCancel() {
        this.$modalInstance.dismiss();
    }
   
 
}