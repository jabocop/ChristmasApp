var mainController;
(function (mainController) {
    'use strict';

    var MainCtrl = (function () {
        function MainCtrl($scope) {
            this.$scope = $scope;
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
        return MainCtrl;
    })();
    mainController.MainCtrl = MainCtrl;
})(mainController || (mainController = {}));
