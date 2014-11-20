/// <reference path='BaseController.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
/// <reference path='../enums.ts' />

interface IHeaderEvents {
    createGroup();
    joinGroup();
}

interface IHeaderScope extends IBaseScope {
    isActive: (viewLocation: string) => boolean;
    alertFactory : alertFactory;
    events : IHeaderEvents
}

class HeaderController extends BaseController implements IHeaderEvents {
    private $scope: IHeaderScope;
    private $location: ng.ILocationService;
    private $modal : ng.ui.bootstrap.IModalService
    private $http : ng.IHttpService;
    
    constructor($scope: IHeaderScope, $location: ng.ILocationService, loginFactory: loginFactory, alertFactory : alertFactory,$modal : ng.ui.bootstrap.IModalService, $http: ng.IHttpService) {
        super($scope, loginFactory);
        this.$scope = $scope;
        $scope.events = this;
        this.$scope.alertFactory = alertFactory;
        this.$location = $location;
        this.$modal = $modal;
        this.$http = $http;
        this.$scope.isActive = (viewLocation : string ) => {
            if (viewLocation === "/") {
                return $location.path() == viewLocation;
            }
            return $location.path().indexOf(viewLocation) >= 0;
        }
    }
    
    
    private getEmptyGroup() : IGroup {
        var retval : IGroup = {
            _id : null,
            name : "",
            users : null
        }
        return retval;
    }
    
    private saveGroup(group : IGroup) {
        var functionToCall : string = 'addGroup';
        var dataToSave = {group : group, userId : this.loginFactory.user._id};
        this.$http.post<any>(functionToCall, dataToSave)
            .success((data, status) => {
                //Succesful. Refresh the list.
                this.loginFactory.refreshGroups();
            })
            .error((data, status) => {
                this.$scope.alertFactory.addAlert(alertType.Danger,"Failed to save group");
            });
    }
    
    
    private openAddGroupModal(group : IGroup) {
        
        var options :ng.ui.bootstrap.IModalSettings = {
            templateUrl : 'views/addGroupModal.html',
            controller : 'AddGroupCtrl',
            resolve : {
                group: () => {return group}
            }
        }
        var modal = this.$modal.open(options);
        modal.result.then( (group :IGroup) => {
            this.saveGroup(group);
        });
    }
    
    
    private addUserToGroup(groupKey : string) {
        var functionToCall : string = 'addUserToGroup';
        var dataToSave = {groupId : groupKey, userId : this.loginFactory.user._id};
        this.$http.post<any>(functionToCall, dataToSave)
            .success((data, status) => {
                //Succesful. Refresh the list.
                this.loginFactory.refreshGroups();
            })
            .error((data, status) => {
                this.$scope.alertFactory.addAlert(alertType.Danger,"Failed to join group");
            });
    }
    
    private openJoinGroupModal() {
        
        var options :ng.ui.bootstrap.IModalSettings = {
            templateUrl : 'views/joinGroupModal.html',
            controller : 'JoinGroupCtrl'
        }
        var modal = this.$modal.open(options);
        modal.result.then( (groupKey :string) => {
            this.addUserToGroup(groupKey);
        });
    }
    
    public createGroup() {
        this.openAddGroupModal(this.getEmptyGroup());
    }
    
    public joinGroup() {
        this.openJoinGroupModal();
        
    }
    

}