/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />

interface INewUserEvents {
    submit: () => void;
}

interface INewUserScope extends IBaseScope {
    user: IUser;
    password2: string;
    events: INewUserEvents;
    loginFactory : loginFactory;
}



class NewUserCtrl extends BaseController {
    private $http: ng.IHttpService;
    
    private $scope: INewUserScope;
    private loginFactory : loginFactory;
    constructor(loginFactory : loginFactory, $scope: INewUserScope, $http: ng.IHttpService) {
        super($scope);
        this.$scope = $scope;
        this.$http = $http;
        this.loginFactory = loginFactory;
        $scope.user = null;
        $scope.password2 = null;
        $scope.events = this;
        $scope.loginFactory = loginFactory;
    }



    public submit(): void {
        this.loginFactory.NewUser(this.$scope.user);
    }

    
    
}
