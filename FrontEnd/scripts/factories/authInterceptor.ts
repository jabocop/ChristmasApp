/// <reference path='../typings/angularjs/angular.d.ts' />


class authInterceptor {
	public static Factory($q: ng.IQService, $window: ng.IWindowService) {
		return new authInterceptor($q, $window)
	}

	public request : (config:ng.IRequestConfig) => any;
	public responseError : (rejection:any) => any;



    constructor($q: ng.IQService, $window: ng.IWindowService) {
		this.request = (config:ng.IRequestConfig) => {
			config.headers = config.headers || {};

            var token = $window.sessionStorage.getItem("token");
            if (token!== null) {
            	config.headers.Authorization = 'Bearer ' + token;
        	}
        	return config;
		}

		this.responseError = (rejection:any) => {
			if (rejection.status === 401) {
                // handle the case where the user is not authenticated
        	}
    		return $q.reject(rejection);

		}


	}


}
