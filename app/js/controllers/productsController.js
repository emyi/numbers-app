angular.module('ghmNumbers')
	.controller('ProductsController', ProductsController);

ProductsController.$inject = ['$http', '$scope', '$timeout'];


//Products controller
function ProductsController($http, $scope, $timeout){
	$http.get("http://localhost:8888/ghm-numbers-reporting/api/wsdl.php?method=all_product")
		.then(function (response) {
			$scope.productData = response.data.records;
		});
	
}