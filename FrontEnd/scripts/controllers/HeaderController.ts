interface IHeaderScope extends IBaseScope {
    isActive: (viewLocation: string) => boolean;
    loginFactory;//: boolean;
    userName;  //: string;
}

class HeaderController {
    private $scope: IHeaderScope;
    private $location: ng.ILocationService;
    private loginFactory : loginFactory;

    constructor($scope: IHeaderScope, $location: ng.ILocationService, loginFactory: loginFactory) {
        this.$scope = $scope;
        this.$location = $location;
        this.loginFactory = loginFactory;
        this.$scope.isActive = (viewLocation : string ) => {
            return viewLocation === $location.path();
        }
        this.$scope.loginFactory = loginFactory;
        //this.$scope.userName = loginFactory.userName;
    }

}