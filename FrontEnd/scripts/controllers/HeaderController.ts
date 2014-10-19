interface IHeaderScope extends IBaseScope {
    isActive: (viewLocation: string) => boolean;
}

class HeaderController extends BaseController {
    private $scope: IHeaderScope;
    private $location: ng.ILocationService;
    
    constructor($scope: IHeaderScope, $location: ng.ILocationService, loginFactory: loginFactory) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$location = $location;
        this.$scope.isActive = (viewLocation : string ) => {
            return viewLocation === $location.path();
        }
    }

}