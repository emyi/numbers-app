angular
	.module('ghmNumbers', ['ui.router', 'customFilters', 'nvd3'])
	.config(ReportRouter)
	// .run(function ($rootScope, $state, $location, loginService){
	// 	$rootScope.$on('$stateChangeStart', function(e, to){
	// 		var connected = loginService.islogged();
	// 		connected.then(function(msg){
	// 			if(msg.data === ''){
	// 				$state.transitionTo("login");
	// 			}
	// 			if(msg.data === 'authentified' && to.data && to.data.needAdmin){
	// 				$state.transitionTo(to.name);
	// 			}
	// 			if(msg.data === 'viewer'){
	// 				if(to.data && to.data.needAdmin){
	// 					$state.transitionTo("login");
	// 				}
	// 				if(!to.data){
	// 					$state.transitionTo(to.name);
	// 				}
	// 			}
	// 		});

	// 	});
	// })
	.directive('format', ['$filter', function ($filter) {
	    return {
	        require: '?ngModel',
	        link: function (scope, elem, attrs, ctrl) {
	            if (!ctrl) return;

	            ctrl.$formatters.unshift(function (a) {
	                return $filter(attrs.format)(ctrl.$modelValue)
	            });

	            elem.bind('blur', function(event) {
	                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
	                elem.val($filter(attrs.format)(plainNumber));
	            });
	        }
	    };
	}]);
function ReportRouter($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/main");

	$stateProvider
		.state('home', {
			parent: 'main',
			url: '/home',
			views: {
				"home": {
					templateUrl: 'home.html'
				}
			},
			// data: {
   //              needAdmin: true
   //          }
		})
		.state('searchPerformances', {
			parent: 'main',
			url: '/searchPerformances',
			views: {
				"searchPerformances": {
					templateUrl: 'searchPerformances.html'
				}
			},
			// data: {
   //              needAdmin: true
   //          }
		})
		.state('homeB', {
			parent: 'mainB',
			url: '/homeB',
			views: {
				"homeB": {
					templateUrl: 'homeB.html'
				}
			}
		})
		.state('searchPerformancesB', {
			parent: 'mainB',
			url: '/searchPerformancesB',
			views: {
				"searchPerformancesB": {
					templateUrl: 'searchPerformancesB.html'
				}
			}
		})
		.state('addBrandProduct', {
			parent: 'main',
			url: '/addBrandProduct',
			views: {
				"addBrandProduct": {
					templateUrl: 'addBrandProduct.html'
				}
			},
			// data: {
   //              needAdmin: true
   //          }
		})
		.state('updatePerformances', {
			parent: 'main',
			url: '/updatePerformances',
			views: {
				"updatePerformances": {
					templateUrl: 'updatePerformances.html'
				}
			},
			// data: {
   //              needAdmin: true
   //          }
		})
		.state('login', {
			url: '/login',
			views: {
				"login": {
					templateUrl: 'login.html'
				}
			}
		})
		.state('main', {
			url: '/main',
			views: {
				"main": {
					templateUrl: 'main.html'
				}
			},
			// data: {
   //              needAdmin: true
   //          }
		})
		.state('mainB', {
			url: '/mainB',
			views: {
				"mainB": {
					templateUrl: 'mainB.html'
				}
			}
		});
}