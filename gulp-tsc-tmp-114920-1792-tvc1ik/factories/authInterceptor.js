/// <reference path='../typings/angularjs/angular.d.ts' />
var authInterceptor = (function () {
    function authInterceptor($q, $window) {
        this.request = function (config) {
            config.headers = config.headers || {};

            var token = $window.sessionStorage.getItem("token");
            if (token !== null) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        };

        this.responseError = function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        };
    }
    authInterceptor.Factory = function ($q, $window) {
        return new authInterceptor($q, $window);
    };
    return authInterceptor;
})();
