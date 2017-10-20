angular.module('ghmNumbers')
.factory('sessionService', ['$http', function($http){
	return {
		set: function(key, value){
			return sessionStorage.setItem(key, value);
		},
		get: function(key){
			return sessionStorage.getItem(key);
		},
		destroy: function(key){
			$http.post('../api/destroy_session.php');
			return sessionStorage.removeItem(key);
		}
	};
}]);