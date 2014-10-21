/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='BaseController.ts' />
/// <reference path='../factories/loginFactory.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var WishlistCtrl = (function (_super) {
    __extends(WishlistCtrl, _super);
    function WishlistCtrl($scope, $routeParams, $http, loginFactory) {
        _super.call(this, $scope, loginFactory);
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
    WishlistCtrl.prototype.getWishlist = function (userId) {
        this.$http.get('/listWishes', { params: { UserId: userId } }).success(function (data, status) {
            alert('Success' + data);
        }).error(function (data, status) {
            alert("Fail!");
        });
    };

    WishlistCtrl.prototype.addWish = function () {
        this.$http.post('newWish', this.$scope.newWish).success(function (data, status) {
            alert('Wish created successfully');
        }).error(function (data, status) {
            alert("Failed to add wish");
        });
    };
    return WishlistCtrl;
})(BaseController);
