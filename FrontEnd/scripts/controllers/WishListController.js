/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='EditWishController.ts' />
/// <reference path='../factories/loginFactory.ts' />
/// <reference path='../factories/alertFactory.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var WishlistCtrl = (function (_super) {
    __extends(WishlistCtrl, _super);
    function WishlistCtrl($scope, $routeParams, $http, loginFactory, alertFactory, $modal) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        this.$modal = $modal;
        this.alertFactory = alertFactory;

        $scope.events = this;
        $scope.userId = $routeParams.userId;
        this.$scope.myWishList = false;
        this.getWishlist();
    }
    WishlistCtrl.prototype.getEmptyWish = function () {
        return {
            _id: null,
            name: "",
            comment: "",
            url: "",
            userId: this.loginFactory.user._id
        };
    };

    WishlistCtrl.prototype.getWishlist = function () {
        var _this = this;
        if (this.$scope.userId !== undefined) {
            this.$http.get('/listWishes', { params: { userId: this.$scope.userId } }).success(function (data, status) {
                _this.$scope.user = data.user;
                _this.$scope.wishes = data.wishes;
            }).error(function (data, status) {
                _this.alertFactory.addAlert(3 /* Danger */, "Failed to list wishes");
            });
        }
    };

    WishlistCtrl.prototype.saveWish = function (wish, editMode) {
        var _this = this;
        var functionToCall = 'saveWish';
        if (editMode == 1 /* NewItem */) {
            functionToCall = "newWish";
        }

        this.$http.post(functionToCall, wish).success(function (data, status) {
            //Succesful. Refresh the list.
            _this.getWishlist();
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to save wish");
        });
    };

    WishlistCtrl.prototype.openEditWishModal = function (wish, newWish) {
        var _this = this;
        var mode = 1 /* NewItem */;
        if (!newWish) {
            mode = 2 /* EditItem */;
        }

        var options = {
            templateUrl: 'views/editWishModal.html',
            controller: 'EditWishCtrl',
            resolve: {
                editMode: function () {
                    return mode;
                },
                wish: function () {
                    return wish;
                }
            }
        };
        var modal = this.$modal.open(options);
        modal.result.then(function (wish) {
            _this.saveWish(wish, mode);
        });
    };

    WishlistCtrl.prototype.addWish = function () {
        this.openEditWishModal(this.getEmptyWish(), true);
    };

    WishlistCtrl.prototype.editWish = function (wish) {
        //Find the wish in the array
        var filteredWishes = $.grep(this.$scope.wishes, function (itm) {
            return itm._id == wish._id;
        });
        if (filteredWishes.length != 1) {
            this.alertFactory.addAlert(3 /* Danger */, "Can't find the selected wish in the database");
        }
        var wishCopy = angular.copy(filteredWishes[0]);
        this.openEditWishModal(wishCopy, false);
    };

    WishlistCtrl.prototype.deleteWish = function (wish) {
        var _this = this;
        var options = {
            templateUrl: 'views/yesNoModal.html',
            controller: 'YesNoModalCtrl',
            resolve: {
                caption: function () {
                    return "Delete wish";
                },
                text: function () {
                    return "Are you sure yoy wish to delete the wish?";
                },
                data: function () {
                    return wish;
                }
            }
        };
        var modal = this.$modal.open(options);
        modal.result.then(function (data) {
            _this.deleteWishConfirmed(wish);
        });
    };

    WishlistCtrl.prototype.deleteWishConfirmed = function (wish) {
        var _this = this;
        this.$http.post('deleteWish', wish).success(function (data, status) {
            //Succesful. Refresh the list.
            _this.getWishlist();
        }).error(function (data, status) {
            _this.alertFactory.addAlert(3 /* Danger */, "Failed to delete wish");
        });
    };
    return WishlistCtrl;
})(BaseController);

var MyWishListCtrl = (function (_super) {
    __extends(MyWishListCtrl, _super);
    function MyWishListCtrl($scope, $http, loginFactory, alertFactory, $modal) {
        var params = { userId: loginFactory.user._id };
        _super.call(this, $scope, params, $http, loginFactory, alertFactory, $modal);
        this.$scope.myWishList = true;
    }
    return MyWishListCtrl;
})(WishlistCtrl);
