/// <reference path='../typings/angularjs/angular.d.ts' />

interface IUser {
    username: string;
    password: string;
}

interface IBaseScope extends ng.IScope {
    user: IUser;
    message: string;
    welcome: string;
    isAuthenticated: boolean;
}

class BaseController {
    private baseScope : IBaseScope
    constructor($scope: IBaseScope) {
        this.baseScope = $scope;
    }
}