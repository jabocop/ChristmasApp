/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />


interface IEditGroupEvents {
    update: () => void;
    remove: () => void;
    invite: () => void;
}

interface IEditGroupScope extends IBaseScope {
    editedGroup: IGroup;
    events: IEditGroupEvents;
    email : string;
}

interface IEditGroupParams {
    groupId : string;
}


class EditGroupCtrl extends BaseController implements IEditGroupEvents {
    public $scope: IEditGroupScope;
    private alertFactory : alertFactory;
    private $http : ng.IHttpService;
    
    constructor(loginFactory : loginFactory, $routeParams: IEditGroupParams, $scope: IEditGroupScope,alertFactory : alertFactory, $http: ng.IHttpService) {
        super($scope,loginFactory);
        this.$scope = $scope;
        this.alertFactory= alertFactory;
        this.$scope.editedGroup = null;
        this.$http = $http;
        $scope.events = this;
    }


    private loadGroup(id : string) :void  {
        this.$http.get<IGroup>('/getGroup', { params: { groupId: id } })
            .success((data, status) => {
                this.$scope.editedGroup = data;
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to fetch group");
            });
    }
    
    public update(): void {
        this.$http.post<any>('saveGroup', this.$scope.editedGroup)
            .success((data, status) => {
                this.$scope.editedGroup = data;
                this.alertFactory.addAlert(alertType.Success,"Group saved");
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to save group");
            });
    }
    
    public remove() : void {
        //TODO: Are you sure
        this.$http.post<any>('removeGroup', this.$scope.editedGroup)
            .success((data, status) => {
                this.alertFactory.addAlert(alertType.Success,"Group removed");
                //TODO: redirect to startpage
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to remove group");
            });
    }
    
    public invite() : void {
        this.$http.post<any>('inviteToGroup', {groupId : this.$scope.editedGroup._id, mail : this.$scope.email})
            .success((data, status) => {
                this.alertFactory.addAlert(alertType.Success,"Mail sent to " + this.$scope.email);
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to send mail");
            });
    }

}

