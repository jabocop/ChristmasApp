/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />

interface IWishlistEvents {
    addWish : () => void;
}

interface IWishlistScope extends IBaseScope {
    userId: string;
    newWish : INewWish;
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
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        $scope.events = this;
        $scope.userId = $routeParams.userId;
        this.$scope.newWish = {
            name: "",
            comment: "",
            url: "",
            userId: this.loginFactory.user._id
        };
        /*
        if (this.userId !== undefined) {
            this.getWishlist(this.userId);
        }*/
    }

    private getWishlist(userId: string) {
        this.$http.get<IWish[]>('/listWishes', { params: { UserId: userId } })
            .success((data, status) => {
                alert('Success' + data);
            })
            .error((data, status) => {
                alert("Fail!");
            });
    }

    public addWish() {
        this.$http.post<any>('newWish', this.$scope.newWish)
            .success((data, status) => {
                alert('Wish created successfully');
            })
            .error((data, status) => {
                alert("Failed to add wish");
            });
    }

}
