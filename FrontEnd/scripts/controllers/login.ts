

interface ILoginEvents {
    submit: () => void;
    callRestricted: () => void;
}
/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />

interface ILoginScope extends IBaseScope {
    user: IUser;
    message: string;
    welcome: string;
    isAuthenticated: boolean;
    events: ILoginEvents;
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
    constructor($scope: ILoginScope, $http: ng.IHttpService, $window: ng.IWindowService) {
        super($scope);
        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        $scope.user = { username: 'john.doe', password: 'foobar' };  
        $scope.message = '';  
        $scope.events = this;
    }



    public submit(): void {
        this.$http
            .post<IAuthorizeRetVal>('/authenticate', this.$scope.user)
            .success((data, status, headers, config) =>  {
                this.$window.sessionStorage.setItem("token",data.token);
                this.$scope.isAuthenticated = true;
                var encodedProfile = data.token.split('.')[1];
                var urlEnoder = new urlDecoder();
                var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
                this.$scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
            })
            .error((data, status, headers, config) =>  {
                // Erase the token if the user fails to log in
                delete this.$window.sessionStorage.removeItem("token");

                // Handle login errors here
                this.$scope.message = 'Error: Invalid user or password';
            }); 
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
