/// <reference path='BaseController.ts' />

interface IMainScope extends IBaseScope {
    awesomeThings : string[];
}



class MainCtrl extends BaseController {
    private $scope : IMainScope;
    constructor($scope: IMainScope, loginFactory: loginFactory) {
        super($scope,loginFactory);
        this.$scope = $scope;
        $scope.awesomeThings = [
      		'HTML5 Boilerplate',
      		'AngularJS',
      		'Karma'
    	];
    }
}
