/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/alertFactory.ts' />



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
    private alertFactory : alertFactory;
    
    constructor(loginFactory : loginFactory, alertFactory: alertFactory, $scope: ILoginScope, $http: ng.IHttpService, $window: ng.IWindowService) {
        super($scope,loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        this.alertFactory = alertFactory;
        $scope.loginUser = null;
        $scope.message = '';  
        $scope.events = this;
    }



    public submit(): void {
        this.loginFactory.Login(this.$scope.loginUser);
        this.$scope.loginUser = null;
        
    }

    public callRestricted(): void {
        this.$http({ url: '/api/restricted', method: 'GET' })
            .success((data:any, status, headers, config) => {
                this.$scope.message = this.$scope.message + ' ' + data.name; // Should log 'foo'
            })
            .error((data, status, headers, config) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to call restricted area");
            });
    }





    

    
}
