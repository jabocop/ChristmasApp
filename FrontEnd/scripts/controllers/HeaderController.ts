

interface IHeaderScope extends IBaseScope {
    isActive: (viewLocation: string) => boolean;
    alertFactory : alertFactory;
}

class HeaderController extends BaseController {
    private $scope: IHeaderScope;
    private $location: ng.ILocationService;
    
    constructor($scope: IHeaderScope, $location: ng.ILocationService, loginFactory: loginFactory, alertFactory : alertFactory) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$scope.alertFactory = alertFactory;
        this.$location = $location;
        this.$scope.isActive = (viewLocation : string ) => {
            return viewLocation === $location.path();
        }
    }

}