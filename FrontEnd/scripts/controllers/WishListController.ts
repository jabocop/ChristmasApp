/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='EditWishController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />

interface IWishlistEvents {
    addWish : () => void;
    editWish : (wish: IWish) => void;
    deleteWish : (wish : IWish) => void;
}

interface IWishlistScope extends IBaseScope {
    userId: string;
	wishes : IWish[];
    user : IUser;
    events: IWishlistEvents;
    myWishList : boolean;
}

interface IWishlistParams {
    userId: string;
}


class WishlistCtrl extends BaseController implements IWishlistEvents {
    public $scope: IWishlistScope;
    private $http: ng.IHttpService;
    private alertFactory : alertFactory;
    private $modal : ng.ui.bootstrap.IModalService;

    constructor($scope: IWishlistScope, $routeParams: IWishlistParams, $http: ng.IHttpService, loginFactory: loginFactory,alertFactory : alertFactory,$modal : ng.ui.bootstrap.IModalService) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$modal = $modal;
        this.alertFactory = alertFactory;
        
        $scope.events = this;
        $scope.userId = $routeParams.userId;
        this.$scope.myWishList = false;
		this.getWishlist();
	}
    
	private getEmptyWish() : IWish {
		return {
            _id : null,
            name: "",
            comment: "",
            url: "",
            userId: this.loginFactory.user._id
        };
	}

    private getWishlist() {
        if (this.$scope.userId !== undefined) {
			this.$http.get<listWishesResult>('/listWishes', { params: { userId: this.$scope.userId } })
				.success((data, status) => {
					this.$scope.user = data.user;
                    this.$scope.wishes = data.wishes;
				})
				.error((data, status) => {
					this.alertFactory.addAlert(alertType.Danger,"Failed to list wishes");
				});
		}
    }

    private saveWish(wish : IWish,editMode : editModeEnum) {
        
        var functionToCall : string = 'saveWish';
        if (editMode == editModeEnum.NewItem) {
            functionToCall = "newWish";
        }
        
        this.$http.post<any>(functionToCall, wish)
            .success((data, status) => {
                //Succesful. Refresh the list.
                this.getWishlist();
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to save wish");
            });
    }
    
    private openEditWishModal(wish : IWish, newWish : boolean) {
        
        var mode = editModeEnum.NewItem;
        if (!newWish) {
            mode = editModeEnum.EditItem;
        }
        
        var options :ng.ui.bootstrap.IModalSettings = {
            templateUrl : 'views/editWishModal.html',
            controller : 'EditWishCtrl',
            resolve : {
                editMode : () => {return mode},
                wish: () => {return wish}
            }
        }
        var modal = this.$modal.open(options);
        modal.result.then( (wish :IWish) => {
            this.saveWish(wish,mode);
        });
    }
    
    public addWish() {
        this.openEditWishModal(this.getEmptyWish(), true);
    }
    
    public editWish(wish : IWish) {
        //Find the wish in the array
        var filteredWishes = $.grep(this.$scope.wishes, (itm:IWish ) => { return itm._id == wish._id; });
        if (filteredWishes.length != 1) {
            this.alertFactory.addAlert(alertType.Danger,"Can't find the selected wish in the database");
        }
        var wishCopy = angular.copy(filteredWishes[0]);
        this.openEditWishModal(wishCopy,false);
    }
    
    public deleteWish(wish : IWish) {
        
        var options :ng.ui.bootstrap.IModalSettings = {
            templateUrl : 'views/yesNoModal.html',
            controller : 'YesNoModalCtrl',
            resolve : {
                caption : () => {return "Delete wish"},
                text: () => {return "Are you sure yoy wish to delete the wish?"},
                data: () => {return wish}
            }
        }
        var modal = this.$modal.open(options);
        modal.result.then( (data :IWish) => {
            this.deleteWishConfirmed(wish);
        });
        
    }
    
    private deleteWishConfirmed(wish : IWish) {
        this.$http.post<any>('deleteWish', wish)
            .success((data, status) => {
                //Succesful. Refresh the list.
                this.getWishlist();
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to delete wish");
            });
    }

}

class MyWishListCtrl extends WishlistCtrl {
    constructor($scope: IWishlistScope,  $http: ng.IHttpService, loginFactory: loginFactory, alertFactory : alertFactory,$modal : ng.ui.bootstrap.IModalService) {
        var params : IWishlistParams = {userId : loginFactory.user._id}
        super($scope,params, $http,  loginFactory,alertFactory, $modal);
        this.$scope.myWishList = true;
         
	}
}
