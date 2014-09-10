var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path='typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />

var urlDecoder = (function () {
    function urlDecoder() {
    }
    urlDecoder.prototype.url_base64_decode = function (str) {
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
        return window.atob(output);
    };
    return urlDecoder;
})();

var LoginCtrl = (function (_super) {
    __extends(LoginCtrl, _super);
    function LoginCtrl(loginFactory, $scope, $http, $window) {
        _super.call(this, $scope);
        this.$scope = $scope;
        this.$http = $http;
        this.$window = $window;
        this.loginFactory = loginFactory;
        $scope.user = { username: 'john.doe', password: 'foobar' };
        $scope.message = '';
        $scope.events = this;
        $scope.loginFactory = loginFactory;
    }
    LoginCtrl.prototype.submit = function () {
        this.loginFactory.Login(this.$scope.user);
        /*this.$http
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
        }); */
    };

    LoginCtrl.prototype.callRestricted = function () {
        var _this = this;
        this.$http({ url: '/api/restricted', method: 'GET' }).success(function (data, status, headers, config) {
            _this.$scope.message = _this.$scope.message + ' ' + data.name; // Should log 'foo'
        }).error(function (data, status, headers, config) {
            alert(data);
        });
    };
    return LoginCtrl;
})(BaseController);
