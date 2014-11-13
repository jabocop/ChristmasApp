/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />
/// <reference path='../enums.ts' />

interface IGrouplistEvents {
    cretateGroup : () => void;
}

interface IGrouplistScope extends IBaseScope {
    userId: string;
	groups : IGroup[];
    events: IGrouplistEvents;
}


class GrouplistCtrl extends BaseController implements IGrouplistEvents {
    private $scope: IGrouplistScope;
    private $http: ng.IHttpService;
    private alertFactory : alertFactory;
    private $modal : ng.ui.bootstrap.IModalService;

    constructor($scope: IGrouplistScope, $http: ng.IHttpService, loginFactory: loginFactory,alertFactory : alertFactory,$modal : ng.ui.bootstrap.IModalService) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$modal = $modal;
        this.alertFactory = alertFactory;
        
        $scope.events = this;
		this.getGrouplist();
	}
    
	
    private getEmptyGroup() : IGroup {
        var retval : IGroup = {
            _id : null,
            name : "",
            users : null
        }
        return retval;
    }

    private getGrouplist() {
        this.loginFactory.user._id
        this.$http.get<IGroup[]>('/listGroupsByUser', { params: { userId: this.loginFactory.user._id } })
            .success((data, status) => {
                this.$scope.groups = data;
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to list groups");
            });
		
    }

    private saveGroup(group : IGroup) {
        var functionToCall : string = 'addGroup';
        var dataToSave = {group : group, userId : this.loginFactory.user._id};
        this.$http.post<any>(functionToCall, dataToSave)
            .success((data, status) => {
                //Succesful. Refresh the list.
                this.getGrouplist();
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to save group");
            });
    }
    
    private openEditGroupModal(group : IGroup, newGroup : boolean) {
        
        var mode = editModeEnum.NewItem;
        if (!newGroup) {
            mode = editModeEnum.EditItem;
        }
        
        var options :ng.ui.bootstrap.IModalSettings = {
            templateUrl : 'views/editGroupModal.html',
            controller : 'EditGroupCtrl',
            resolve : {
                editMode : () => {return mode},
                group: () => {return group}
            }
        }
        var modal = this.$modal.open(options);
        modal.result.then( (group :IGroup) => {
            this.saveGroup(group);
        });
    }
    
    public cretateGroup() {
        this.openEditGroupModal(this.getEmptyGroup(), true);
    }
    
    
}
