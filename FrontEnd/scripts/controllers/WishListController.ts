/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />

interface IWishlistEvents {
    addWish : () => void;
    saveWish : () => void;
    editWish : (wish: IWish) => void;
    deleteWish : (wish : IWish) => void;
    
}

interface IWishlistScope extends IBaseScope {
    
    userId: string;
    editedWish : IWish;
	wishes : IWish[];
    events: IWishlistEvents;
    editMode : editMode;
}

interface IWishlistParams {
    userId: string;
}

enum editMode {
    None,
    NewItem,
    EditItem
}


class WishlistCtrl extends BaseController implements IWishlistEvents {
    private $scope: IWishlistScope;
    private $http: ng.IHttpService;

    constructor($scope: IWishlistScope, $routeParams: IWishlistParams, $http: ng.IHttpService, loginFactory: loginFactory) {
        super($scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        $scope.events = this;
        $scope.userId = $routeParams.userId;
        this.$scope.editedWish = null;
        this.$scope.editMode = editMode.None;
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
        this.$scope.editedWish = null;
        this.$scope.editMode = editMode.None
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

    public saveWish() {
        var functionToCall : string = null;
        
        if (this.$scope.editMode !== editMode.None) {
            functionToCall = 'saveWish';
        } 
        
        if (functionToCall !== null) {
            this.$http.post<any>(functionToCall, this.$scope.editedWish)
                .success((data, status) => {
                    //Succesful. Refresh the list.
                    this.getWishlist();
                })
                .error((data, status) => {
                    alert("Failed to save wish");
                });
        }
    }
    
    public addWish() {
        this.$scope.editedWish = this.getEmptyWish();
        this.$scope.editMode = editMode.NewItem;
    }
    
    public editWish(wish : IWish) {
        //Find the wish in the array
        var filteredWishes = $.grep(this.$scope.wishes, (itm:IWish ) => { return itm._id == wish._id; });
        if (filteredWishes.length != 1) {
            alert("Can't find the wish");
        }
        this.$scope.editedWish  = filteredWishes[0];
        this.$scope.editMode = editMode.EditItem;
    }
    
    public deleteWish(wish : IWish) {
        //TODO: Are you sure.....    
        this.$http.post<any>('deleteWish', wish)
            .success((data, status) => {
                //Succesful. Refresh the list.
                this.getWishlist();
            })
            .error((data, status) => {
                alert("Failed to delete wish");
            });
        
        
    }

}