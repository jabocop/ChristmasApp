/// <reference path='alertFactory.ts' />

var loginFactory = (function () {
    function loginFactory($http, $window, $location, alertFactory) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.alertFactory = alertFactory;
    }
    loginFactory.prototype.Login = function (user) {
        var _this = this;
        this.$http.post('/authenticate', user).success(function (data, status, headers, config) {
            _this.$window.sessionStorage.setItem("token", data.token);
            _this.isAuthenticated = true;
            var encodedProfile = data.token.split('.')[1];
            var urlEnoder = new urlDecoder();
            var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
            _this.alertFactory.addAlert(0 /* Success */, "User logged in successfully");
            _this.email = user.email;
            _this.user = data.user;
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete _this.$window.sessionStorage.removeItem("token");

            // Handle login errors here
            _this.alertFactory.addAlert(3 /* Danger */, "Invalid username or password");
        });
    };

    loginFactory.prototype.Logout = function () {
        delete this.$window.sessionStorage.removeItem("token");
        this.isAuthenticated = false;
        this.email = null;
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
