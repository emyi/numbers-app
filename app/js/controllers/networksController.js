angular.module('ghmNumbers')
	.controller('NetworksController', NetworksController);

NetworksController.$inject = ['$scope', '$http'];

function NetworksController($scope, $http){
	$http.get("http://localhost:8888/ghm-numbers-reporting/api/wsdl.php?method=all_network")
		.then(function (response) {
			$scope.networkData = response.data.records;
		});
}