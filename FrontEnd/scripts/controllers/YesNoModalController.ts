/// <reference path='BaseController.ts' />
/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

interface IYesNoModalEvents {
    onYes : ()=> void ;
    onNo : () => void;
}

interface IYesNoModalScope {
    caption : string;
    text : string;
	events: IYesNoModalEvents;
}


class YesNoModalCtrl implements IYesNoModalEvents {
    private $scope: IYesNoModalScope;
    private $modalInstance : ng.ui.bootstrap.IModalServiceInstance;
    private data : any;
    
    constructor($scope: IYesNoModalScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance,  caption: string, text : string,data: any) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.caption = caption;
        this.$scope.text = text;        
        this.data = data;
        this.$modalInstance = $modalInstance;
	}
    
    
    public onYes() {
        this.$modalInstance.close(this.data);
    }
    
    public onNo() {
        this.$modalInstance.dismiss();
    }
}
