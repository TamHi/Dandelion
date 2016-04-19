angular.module('dandelionApp')
	.controller('ProductFormCtrl', function($scope, _) {

		$scope.deletePic = (pic, $event) => {
			console.log(pic);
			$scope.product.pictures.splice($scope.product.pictures.indexOf(pic), 1);
			$event.stopPropagation();
		}
	});