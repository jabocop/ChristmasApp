/// <reference path='../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

var JoinGroupCtrl = (function () {
    function JoinGroupCtrl($scope, $modalInstance) {
        this.$scope = $scope;
        this.$scope.events = this;
        this.$modalInstance = $modalInstance;
    }
    JoinGroupCtrl.prototype.onOk = function () {
        this.$modalInstance.close(this.$scope.key);
    };

    JoinGroupCtrl.prototype.onCancel = function () {
        this.$modalInstance.dismiss();
    };
    return JoinGroupCtrl;
})();
