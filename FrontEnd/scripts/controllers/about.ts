module aboutController {
	'use strict';

	export class AboutCtrl {
		constructor(private $scope: any) {			
			$scope.awesomeThings = [
      			'HTML5 Boilerplate',
      			'AngularJS',
      			'Karma'
    		];
		}
	}
}