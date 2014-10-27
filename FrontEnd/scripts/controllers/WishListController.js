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
        this.$scope.newWish = this.getEmptyWish();

        this.getWishlist();
    }
    WishlistCtrl.prototype.getEmptyWish = function () {
        return {
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
                _this.$scope.wishes = data;
            }).error(function (data, status) {
                alert("Fail!");
            });
        }
    };

    WishlistCtrl.prototype.addWish = function () {
        var _this = this;
        this.$http.post('newWish', this.$scope.newWish).success(function (data, status) {
            _this.$scope.newWish = _this.getEmptyWish();
            _this.getWishlist();
        }).error(function (data, status) {
            alert("Failed to add wish");
        });
    };
    return WishlistCtrl;
})(BaseController);
