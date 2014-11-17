/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />


interface IEditUserEvents {
    submit: () => void;
}

interface IEditUserScope extends IBaseScope {
    editedUser: IEditedUser;
    password2: string;
    events: IEditUserEvents;
    isNewUser : boolean; 
}


class NewUserCtrl extends BaseController {
    public $scope: IEditUserScope;
    public /*protected */ alertFactory : alertFactory;
    constructor(loginFactory : loginFactory, $scope: IEditUserScope,alertFactory : alertFactory) {
        super($scope,loginFactory);
        this.$scope = $scope;
        this.alertFactory= alertFactory;
        this.$scope.isNewUser = this.internalIsNewUser();    
        this. $scope.editedUser = this.getEmptyUser();    
        $scope.password2 = null;
        $scope.events = this;
    }


    private getEmptyUser() : IEditedUser {
        return { _id : null,
                 email : null,
                 name : null,
                 password : null };
    }
    
    public internalIsNewUser() : boolean {
        return true;
    }

    public submit(): void {
        if (!this.$scope.editedUser.password || this.$scope.password2 !== this.$scope.editedUser.password) {
            this.alertFactory.addAlert(alertType.Warning,"Password must be entered and be matched.");
        } else {
            this.loginFactory.editUser(this.$scope.editedUser);
        }
    }

    
    
}


class EditUserCtrl extends NewUserCtrl {
    
    constructor(loginFactory : loginFactory, $scope: IEditUserScope,alertFactory : alertFactory) {
        super(loginFactory,$scope,alertFactory);   
        $scope.editedUser = 
                {   _id : this.loginFactory.user._id,
                    email :this.loginFactory.user.email,
                    name : this.loginFactory.user.name,
                    password : null
                };
    }
    
    public /*override */ internalIsNewUser() : boolean {
        return false;
    }
}
