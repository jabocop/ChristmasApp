/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../factories/loginFactory.ts' />

interface IWish{
    _id: string;
    name: string;
    comment: string;
    url: string;
    userId: string;
}


interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface INewUser extends IUser {
    password: string;
}


interface ILoginUser {
    email: string;
    password: string;
}

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