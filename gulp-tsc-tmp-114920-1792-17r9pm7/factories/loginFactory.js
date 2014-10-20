var loginFactory = (function () {
    function loginFactory($http, $window, $location) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
    }
    loginFactory.prototype.Login = function (user) {
        var _this = this;
        this.$http.post('/authenticate', user).success(function (data, status, headers, config) {
            _this.$window.sessionStorage.setItem("token", data.token);
            _this.isAuthenticated = true;
            var encodedProfile = data.token.split('.')[1];
            var urlEnoder = new urlDecoder();
            var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));

            //this.$scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
            alert("Success" + user.email);
            _this.email = user.email;
            _this.user = data.user;
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete _this.$window.sessionStorage.removeItem("token");

            // Handle login errors here
            alert("Fail!");
            //this.$scope.message = 'Error: Invalid user or password';
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
            alert("New user registered succesfully");
            _this.$location.path('/login');
        }).error(function (data, status, headers, config) {
            alert("Failed to register user");
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
