/// <reference path='alertFactory.ts' />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />

var loginFactory = (function () {
    function loginFactory($http, $window, $location, alertFactory) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.alertFactory = alertFactory;
        var loggedinUserStr = this.$window.sessionStorage.getItem("user");
        if (loggedinUserStr !== null) {
            //The browser is refreshed and the user needs to be refreshed from the sessionStorage
            this.initUser(JSON.parse(loggedinUserStr));
        }
    }
    loginFactory.prototype.initUser = function (user) {
        this.isAuthenticated = true;
        this.user = user;
    };

    loginFactory.prototype.clearSessionStorage = function () {
        delete this.$window.sessionStorage.removeItem("token");
        delete this.$window.sessionStorage.removeItem("user");
    };

    loginFactory.prototype.Login = function (user) {
        var _this = this;
        this.$http.post('/authenticate', user).success(function (data, status, headers, config) {
            var encodedProfile = data.token.split('.')[1];
            var urlEnoder = new urlDecoder();
            var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
            _this.$window.sessionStorage.setItem("token", data.token);
            _this.$window.sessionStorage.setItem("user", JSON.stringify(profile));
            _this.initUser(profile);
            _this.$location.path('/');
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            _this.clearSessionStorage();

            // Handle login errors here
            _this.alertFactory.addAlert(3 /* Danger */, "Invalid username or password");
        });
    };

    loginFactory.prototype.Logout = function () {
        this.clearSessionStorage();
        this.isAuthenticated = false;
        this.user = null;
    };

    loginFactory.prototype.NewUser = function (user) {
        var _this = this;
        this.$http.post('/newUser', user).success(function (data, status, headers, config) {
            _this.alertFactory.addAlert(0 /* Success */, "User is created");
            _this.$location.path('/login');
        }).error(function (data, status, headers, config) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to register new userq");
        });
    };
    return loginFactory;
})();

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
