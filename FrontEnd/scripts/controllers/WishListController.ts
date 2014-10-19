/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />

interface IWishlistEvents {
    
}

interface IWishlistScope extends IBaseScope {
    userId: string;
    events: IWishlistEvents;
}

interface IWishlistParams {
    userId: string;
}


class WishlistCtrl extends BaseController {
    private $scope: IWishlistScope;
    private userId: string;
    private $http: ng.IHttpService;
    constructor($scope: IWishlistScope, $routeParams: IWishlistParams, $http: ng.IHttpService, loginFactory: loginFactory) {
        super($scope,loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        $scope.events = this;
        $scope.userId = $routeParams.userId;
        /*
        if (this.userId !== undefined) {
            this.getWishlist(this.userId);
        }*/
    }

    private getWishlist(userId: string) {
        this.$http
            .get<any>('/getWishList', { params: { UserId: userId } })
            .success((data, status) => {
                alert('Success' + data) 
            })
            .error((data, status) => {
                alert("Fail!");
            });
    }

}
