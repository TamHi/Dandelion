angular.module('dandelionApp.admin')
	.directive('productForm', function() {
		return {
			retrict: 'E',
			scope: {
				title: '@',
				product: '=',
				catalogs: '='
			},
			templateUrl: 'app/admin/products/product-form/product-form.html',
			controller: 'ProductFormCtrl',
			link: function(scope) {
				scope.$watch('catalogs', function(cats) {
				  if(cats){
				  	scope.catalogs = cats;
				  	console.log(scope.catalogs);
				  }
				})
			}
		}
	})