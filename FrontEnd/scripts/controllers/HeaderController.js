var HeaderController = (function () {
    function HeaderController($scope, $location, loginFactory) {
        this.$scope = $scope;
        this.$location = $location;
        this.loginFactory = loginFactory;
        this.$scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        this.$scope.loginFactory = loginFactory;
        //this.$scope.userName = loginFactory.userName;
    }
    return HeaderController;
})();
