var loginFactory = (function () {
    function loginFactory($http, $window) {
        this.$http = $http;
        this.$window = $window;
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
            alert("Success" + user.username);
            _this.userName = user.username;
        }).error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete _this.$window.sessionStorage.removeItem("token");

            // Handle login errors here
            alert("Fail!");
            //this.$scope.message = 'Error: Invalid user or password';
        });
    };
    return loginFactory;
})();
