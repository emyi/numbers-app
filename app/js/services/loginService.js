angular.module('ghmNumbers')
.factory('loginService', function($http, $location, sessionService){
	return {
		create: function(data){
			var $promise = $http.post('../api/create_user.php', data);
			return $promise;
		},
		login: function(data){
			var $promise = $http.post('../api/user_auth.php', data);
			$promise.then(function(msg){
				var uid = msg.data;
				if(uid == 'ERROR: password does not match'){
					$location.path('/login');
					alert('wrong info');
				}
				else if(uid.slice(0, 3) == 'ang'){
					sessionService.set('uid', uid);
					$location.path('/main/home');
				}
				else if(uid.slice(0, 3) == 'vie'){
					sessionService.set('uid', uid);
					$location.path('/mainB/homeB');
				}
			});
			return $promise;
		},
		logout: function(){
			sessionService.destroy('uid');
			$location.path('/login');
		},
		islogged: function(){
			var $checkSessionService = $http.post('../api/check_session.php');
			return $checkSessionService;
		}
	};
});