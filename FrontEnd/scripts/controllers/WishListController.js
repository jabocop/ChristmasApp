/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var editMode;
(function (editMode) {
    editMode[editMode["None"] = 0] = "None";
    editMode[editMode["NewItem"] = 1] = "NewItem";
    editMode[editMode["EditItem"] = 2] = "EditItem";
})(editMode || (editMode = {}));

var WishlistCtrl = (function (_super) {
    __extends(WishlistCtrl, _super);
    function WishlistCtrl($scope, $routeParams, $http, loginFactory) {
        _super.call(this, $scope, loginFactory);
        this.$scope = $scope;
        this.$http = $http;
        $scope.events = this;
        $scope.userId = $routeParams.userId;
        this.$scope.editedWish = null;
        this.$scope.editMode = 0 /* None */;
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
        this.$scope.editedWish = null;
        this.$scope.editMode = 0 /* None */;
        if (this.$scope.userId !== undefined) {
            this.$http.get('/listWishes', { params: { userId: this.$scope.userId } }).success(function (data, status) {
                _this.$scope.wishes = data;
            }).error(function (data, status) {
                alert("Fail!");
            });
        }
    };

    WishlistCtrl.prototype.saveWish = function () {
        var _this = this;
        var functionToCall = null;

        if (this.$scope.editMode !== 0 /* None */) {
            functionToCall = 'saveWish';
        }

        if (functionToCall !== null) {
            this.$http.post(functionToCall, this.$scope.editedWish).success(function (data, status) {
                //Succesful. Refresh the list.
                _this.getWishlist();
            }).error(function (data, status) {
                alert("Failed to save wish");
            });
        }
    };

    WishlistCtrl.prototype.addWish = function () {
        this.$scope.editedWish = this.getEmptyWish();
        this.$scope.editMode = 1 /* NewItem */;
    };

    WishlistCtrl.prototype.editWish = function (wish) {
        //Find the wish in the array
        var filteredWishes = $.grep(this.$scope.wishes, function (itm) {
            return itm._id == wish._id;
        });
        if (filteredWishes.length != 1) {
            alert("Can't find the wish");
        }
        this.$scope.editedWish = filteredWishes[0];
        this.$scope.editMode = 2 /* EditItem */;
    };

    WishlistCtrl.prototype.deleteWish = function (wish) {
        var _this = this;
        //TODO: Are you sure.....
        this.$http.post('deleteWish', wish).success(function (data, status) {
            //Succesful. Refresh the list.
            _this.getWishlist();
        }).error(function (data, status) {
            alert("Failed to delete wish");
        });
    };
    return WishlistCtrl;
})(BaseController);
