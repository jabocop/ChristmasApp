/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />


interface INewUserEvents {
    submit: () => void;
}

interface INewUserScope extends IBaseScope {
    newUser: INewUser;
    password2: string;
    events: INewUserEvents;
    loginFactory : loginFactory;
}



class NewUserCtrl extends BaseController {
    private $scope: INewUserScope;
    constructor(loginFactory : loginFactory, $scope: INewUserScope) {
        super($scope,loginFactory);
        this.$scope = $scope;
        this.loginFactory = loginFactory;
        $scope.newUser = null;
        $scope.password2 = null;
        $scope.events = this;
    }



    public submit(): void {
        this.loginFactory.NewUser(this.$scope.newUser);
    }

    
    
}
