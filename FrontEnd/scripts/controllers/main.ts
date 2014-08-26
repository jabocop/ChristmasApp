module mainController {
	'use strict';

	export class MainCtrl {
		constructor(private $scope: any) {			
			$scope.awesomeThings = [
      			'HTML5 Boilerplate',
      			'AngularJS',
      			'Karma'
    		];
		}
	}
}