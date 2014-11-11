/// <reference path='BaseController.ts' />
/// <reference path='WishListController.ts' />
/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

var YesNoModalCtrl = (function () {
    function YesNoModalCtrl($scope, $modalInstance, caption, text, data) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$scope.caption = caption;
        this.$scope.text = text;
        this.data = data;
        this.$modalInstance = $modalInstance;
    }
    YesNoModalCtrl.prototype.onYes = function () {
        this.$modalInstance.close(this.data);
    };

    YesNoModalCtrl.prototype.onNo = function () {
        this.$modalInstance.dismiss();
    };
    return YesNoModalCtrl;
})();
