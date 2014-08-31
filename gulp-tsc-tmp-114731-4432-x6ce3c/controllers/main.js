/// <reference path='BaseController.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var MainCtrl = (function (_super) {
    __extends(MainCtrl, _super);
    function MainCtrl($scope) {
        _super.call(this, $scope);
        this.$scope = $scope;
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }
    return MainCtrl;
})(BaseController);
