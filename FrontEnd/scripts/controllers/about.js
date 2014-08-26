var aboutController;
(function (aboutController) {
    'use strict';

    var AboutCtrl = (function () {
        function AboutCtrl($scope) {
            this.$scope = $scope;
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
        return AboutCtrl;
    })();
    aboutController.AboutCtrl = AboutCtrl;
})(aboutController || (aboutController = {}));
