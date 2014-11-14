/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />

interface IGroupEvents {
    userSelected : (user : IUser) => void 
}

interface IGroupScope extends IBaseScope {
    group : IGroup;
    events: IGroupEvents;
}

interface IGroupParams {
    groupId: string;
}


class GroupCtrl extends BaseController implements IGroupEvents {
    private $scope: IGroupScope;
    private $http: ng.IHttpService;
    private alertFactory : alertFactory;
    private groupId : string;
    
    constructor($scope: IGroupScope, $routeParams: IGroupParams, $http: ng.IHttpService, loginFactory: loginFactory,alertFactory : alertFactory) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.alertFactory = alertFactory;
        
        $scope.events = this;
        this.groupId = $routeParams.groupId;
		this.getGroup();
	}
    
	private getGroup() {
        if (this.groupId !== undefined) {
			this.$http.get<IGroup>('/getGroupWithUsers', { params: { groupId: this.groupId } })
				.success((data, status) => {
					this.$scope.group = data;
				})
				.error((data, status) => {
					this.alertFactory.addAlert(alertType.Danger,"Failed to list users");
				});
		}
    }

    public userSelected(user : IUser) {
        
    }

}
