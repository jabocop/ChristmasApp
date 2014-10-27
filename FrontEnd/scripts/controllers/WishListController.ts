/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />

interface IWishlistEvents {
    addWish : () => void;
}

interface IWishlistScope extends IBaseScope {
    userId: string;
    newWish : IWish;
	wishes : IWish[];
    events: IWishlistEvents;
}

interface IWishlistParams {
    userId: string;
}


class WishlistCtrl extends BaseController {
    private $scope: IWishlistScope;
    private $http: ng.IHttpService;

    constructor($scope: IWishlistScope, $routeParams: IWishlistParams, $http: ng.IHttpService, loginFactory: loginFactory) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        $scope.events = this;
        $scope.userId = $routeParams.userId;
        this.$scope.newWish = this.getEmptyWish();
        
        
		this.getWishlist();
	}
    
	private getEmptyWish() : IWish {
		return {
            name: "",
            comment: "",
            url: "",
            userId: this.loginFactory.user._id
        };
	}

    private getWishlist() {
        if (this.$scope.userId !== undefined) {
			this.$http.get<IWish[]>('/listWishes', { params: { userId: this.$scope.userId } })
				.success((data, status) => {
					this.$scope.wishes = data;
				})
				.error((data, status) => {
					alert("Fail!");
				});
		}
    }

    public addWish() {
        this.$http.post<any>('newWish', this.$scope.newWish)
            .success((data, status) => {
                this.$scope.newWish = this.getEmptyWish();
				this.getWishlist();
            })
            .error((data, status) => {
                alert("Failed to add wish");
            });
    }

}
