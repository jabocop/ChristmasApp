/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />


interface ILoginEvents {
    submit: () => void;
    callRestricted: () => void;
}

interface ILoginScope extends IBaseScope {
    user: IUser;
    message: string;
    welcome: string;
    isAuthenticated: boolean;
    events: ILoginEvents;
    loginFactory : loginFactory;
}

interface IAuthorizeRetVal {
    token: string;
}

class urlDecoder {
  public url_base64_decode(str:string) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += '==';
            break;
          case 3:
            output += '=';
            break;
          default:
            throw 'Illegal base64url string!';
      }
      return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }
}


class LoginCtrl extends BaseController {
    private $http: ng.IHttpService;
    private $window: ng.IWindowService;
    private $scope: ILoginScope;
    private loginFactory : loginFactory;
    constructor(loginFactory : loginFactory, $scope: ILoginScope, $http: ng.IHttpService, $window: ng.IWindowService) {
        super($scope);
        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        this.loginFactory = loginFactory;
        $scope.user = { username: 'john.doe', password: 'foobar' };  
        $scope.message = '';  
        $scope.events = this;
        $scope.loginFactory = loginFactory;
    }



    public submit(): void {
        this.loginFactory.Login(this.$scope.user);
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
