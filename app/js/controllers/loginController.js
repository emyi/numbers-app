angular.module('ghmNumbers')
	.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', 'loginService'];

function LoginController($scope, loginService){
	$scope.lockout = false;
	$scope.login = function(user){
		loginService.login(user).then(function(response){
			console.log(response.data);
			if(response.data === 'lockout'){
				$scope.lockout = true;
			}
		});
	}

	$scope.create = function(user){
		loginService.create(user);
	}
	$scope.logout = function(){
		loginService.logout();
	}
}