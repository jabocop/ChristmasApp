/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />


interface ILoginEvents {
    submit: () => void;
    callRestricted: () => void;
}

interface ILoginScope extends IBaseScope {
    loginUser: ILoginUser;
    message: string;
    welcome: string;
    isAuthenticated: boolean;
    events: ILoginEvents;
    loginFactory : loginFactory;
}

interface IAuthorizeRetVal {
    token: string;
}




class LoginCtrl extends BaseController {
    private $http: ng.IHttpService;
    private $window: ng.IWindowService;
    private $scope: ILoginScope;
    constructor(loginFactory : loginFactory, $scope: ILoginScope, $http: ng.IHttpService, $window: ng.IWindowService) {
        super($scope,loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        $scope.loginUser = null;
        $scope.message = '';  
        $scope.events = this;
    }



    public submit(): void {
        this.loginFactory.Login(this.$scope.loginUser);
    }

    public callRestricted(): void {
        this.$http({ url: '/api/restricted', method: 'GET' })
            .success((data:any, status, headers, config) => {
                this.$scope.message = this.$scope.message + ' ' + data.name; // Should log 'foo'
            })
            .error((data, status, headers, config) => {
                alert(data);
            });
    }





    

    
}
