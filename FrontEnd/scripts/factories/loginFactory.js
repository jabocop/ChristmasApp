/// <reference path='alertFactory.ts' />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />

var loginFactory = (function () {
    function loginFactory($http, $window, $location, alertFactory) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.alertFactory = alertFactory;
        var sessionData = this.$window.sessionStorage.getItem("sessionData");
        if (sessionData !== null) {
            //The browser is refreshed and the user needs to be refreshed from the sessionStorage
            this.initSessionData(JSON.parse(sessionData));
        }
    }
    loginFactory.prototype.initSessionData = function (sessionData) {
        this.isAuthenticated = true;
        this.user = sessionData.user;
        this.groups = sessionData.groups;
    };

    loginFactory.prototype.clearSessionStorage = function () {
        delete this.$window.sessionStorage.removeItem("token");
        delete this.$window.sessionStorage.removeItem("sessionData");
    };

    loginFactory.prototype.Login = function (user) {
        var _this = this;
        this.$http.post('/authenticate', user).success(function (data, status, headers, config) {
            var encodedProfile = data.token.split('.')[1];
            var urlEnoder = new urlDecoder();
            var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
            _this.$window.sessionStorage.setItem("token", data.token);
            var sessionData = { user: profile, groups: data.groups };
            _this.$window.sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
            _this.initSessionData(sessionData);
            _this.$location.path('/');
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            _this.clearSessionStorage();

            // Handle login errors here
            _this.alertFactory.addAlert(3 /* Danger */, "Invalid username or password");
        });
    };

    loginFactory.prototype.logout = function () {
        this.clearSessionStorage();
        this.isAuthenticated = false;
        this.user = null;
        this.groups = null;
    };

    loginFactory.prototype.editUser = function (user) {
        this.saveUser(user, false);
    };

    loginFactory.prototype.newUser = function (user) {
        this.saveUser(user, true);
    };

    loginFactory.prototype.saveUser = function (user, isNewUser) {
        var _this = this;
        var methodToCall = isNewUser ? "/newUser" : "/editUser";

        this.$http.post(methodToCall, user).success(function (data, status, headers, config) {
            _this.alertFactory.addAlert(0 /* Success */, "User is saved");
            _this.$location.path('/login');
        }).error(function (data, status, headers, config) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to save user");
        });
    };

    loginFactory.prototype.refreshGroups = function () {
        var _this = this;
        this.$http.get('/listGroupsByUser', { params: { userId: this.user._id } }).success(function (data, status) {
            _this.groups = data;
            var sessionData = JSON.parse(_this.$window.sessionStorage.getItem("sessionData"));
            if (sessionData !== null) {
                sessionData.groups = _this.groups;
                _this.$window.sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
            }
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to list groups");
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
