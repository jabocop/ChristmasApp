/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../factories/loginFactory.ts' />


interface IBaseScope extends ng.IScope {
    loginFactory: loginFactory;
    message: string;
    welcome: string;
}

class BaseController {
    private baseScope: IBaseScope;
    public loginFactory: loginFactory;
    
    constructor($scope: IBaseScope,loginFactory :loginFactory) {
        this.baseScope = $scope;
        this.loginFactory = loginFactory;
        this.baseScope.loginFactory = loginFactory;
    }
}