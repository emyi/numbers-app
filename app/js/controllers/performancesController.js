angular.module('ghmNumbers')
	.controller('PerformancesController', PerformancesController);

PerformancesController.$inject = ['$scope', '$http', '$filter', '$state'];

function PerformancesController($scope, $http, $filter, $state){
	var self = this;
	var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
	$scope.selectedDevice = {Name: "Desktop"};
	$scope.deviceList = [{Name: "Desktop", Checked: true}, {Name: "Tablet", Checked: true}, {Name: "Mobile", Checked: true}];
	$scope.devices = {
		Desktop: true,
		Tablet: true,
		Mobile: true
	};
	$scope.productsInBrand = [];
	$scope.selectedProductsInBrand;
	$scope.selectedProduct = {};
	$scope.brandData;
	$scope.performanceData;
	$scope.networkData;
	$scope.productData;
	$scope.tempPerformance = {};
	$scope.tempCart = {};
	$scope.productsList = [];
	$scope.networksList = [];
	$scope.networks = {};
	$scope.from_date = new Date("1/1/2016");
	$scope.selectedBrand = {};
	$scope.selectedNetwork = {};
	$scope.to_date = {
		value: $filter('date')(new Date(y, m, d), 'yyyy-MM-dd')
	};

	$scope.firstDay = {
		value: $filter('date')(new Date(y, m, 1), 'yyyy-MM-dd')
	};
	$scope.lastDay = {
		value: $filter('date')(new Date(y, m + 1, 0), 'yyyy-MM-dd')
	};
	$scope.homeFirstDay = {
		value: $filter('date')(new Date(y, m, 1), 'yyyy-MM-dd')
	};
	$scope.homeLastDay = {
		value: $filter('date')(new Date(y, m + 1, 0), 'yyyy-MM-dd')
	};
	$scope.yesterday = {
		value: $filter('date')(date.setDate(date.getDate() - 1), 'yyyy-MM-dd')
	};
	$scope.yesterdayApb = [];
	$scope.yesterdayCpb = [];
	$scope.apd = [];
	$scope.apb = [];
	$scope.apb2 = [];
	$scope.app = [];
	$scope.apn = [];
	$scope.apDevice = [];
	$scope.cpd = [];
	$scope.cpb = [];
	$scope.cpb2 = [];
	$scope.cartROI = 0;
	$scope.dailyCpd = [];
	$scope.monthlyCpb = [];
	$scope.filledDate = [];
	$scope.filledDateBrand = [];
	$scope.filledCartBrand = [];
	$scope.filledCartDate = [];
	$scope.filledBrandCost = [];
	$scope.orderPropertyYesterday = "BrandName";
	$scope.orderPropertyMonthlyCart = "BrandName";
	$scope.orderPropertyMonthlyProduct = "ProductName";
	$scope.orderPropertyMonthlyNetwork = "NetworkName";
	$scope.groupCartPerformance = function() {
		var dupe = false;
		var match = false;
		for(var j = 0; j<$scope.cartPerformanceData.length; j++){
			for(var i = 0; i<$scope.apd.length; i++ ){
				var dailyCartROI = ($scope.cartPerformanceData[j].CRevenue/$scope.apd[i].Cost)*100;
				if($scope.cartPerformanceData[j].Date == $scope.apd[i].Date){
					match = true;
					for(var k = 0; k < $scope.dailyCpd.length; k++){
						if($scope.cartPerformanceData[j].Date == $scope.dailyCpd[k].Date){
							dupe = true;
						}
					}
					if(dupe === false){
						$scope.dailyCpd.push({ID: $scope.cartPerformanceData[j].ID, BrandID: $scope.cartPerformanceData[j].BrandID, BrandName: $scope.cartPerformanceData[j].BrandName, Date: $scope.cartPerformanceData[j].Date, Revenue: parseFloat($scope.cartPerformanceData[j].CRevenue), ROI: dailyCartROI});
					}
					dupe = false;
				}
				else {
					match = false;
				}
			}
			if(match === false){
				for(var k = 0; k < $scope.dailyCpd.length; k++){
					if($scope.cartPerformanceData[j].Date == $scope.dailyCpd[k].Date){
						dupe = true;
					}
				}
				if(dupe === false){
					$scope.dailyCpd.push({ID: $scope.cartPerformanceData[j].ID, BrandID: $scope.cartPerformanceData[j].BrandID, BrandName: $scope.cartPerformanceData[j].BrandName, Date: $scope.cartPerformanceData[j].Date, Revenue: parseFloat($scope.cartPerformanceData[j].CRevenue)});
				}
				dupe = false;
			}
			match = false;
		}
	};

	$scope.getTotalCartRevenue = function(){
		$scope.totalCartRevenue = 0;
		for(var i = 0; i < $scope.cartPerformanceData.length; i++){
			var rev = parseFloat($scope.cartPerformanceData[i].CRevenue);
			$scope.totalCartRevenue += rev;
		}
		return $scope.totalCartRevenue;
	};
	$scope.getYesterdayTotalCartRevenue = function(){
		$scope.yesterdayTotalCartRevenue = 0;
		for(var i = 0; i < $scope.yesterdayCartPerformanceData.length; i++){
			var rev = parseFloat($scope.yesterdayCartPerformanceData[i].CRevenue);
			$scope.yesterdayTotalCartRevenue += rev;
		}
		return $scope.yesterdayTotalCartRevenue;
	};
	$scope.getMonthlyTotalCartRevenue = function(){
		$scope.monthlyTotalCartRevenue = 0;
		for(var i = 0; i < $scope.monthlyCartPerformanceData.length; i++){
			var rev = parseFloat($scope.monthlyCartPerformanceData[i].CRevenue);
			$scope.monthlyTotalCartRevenue += rev;
		}
		return $scope.monthlyTotalCartRevenue;
	};

	$scope.getTotalRevenue = function(){
		$scope.totalRevenue = 0;
		for(var i = 0; i < $scope.apd.length; i++){
			var rev = $scope.apd[i].Revenue;
			$scope.totalRevenue += rev;
		}
		return $scope.totalRevenue;
	};
	$scope.getYesterdayTotalRevenue = function(){
		$scope.yesterdayTotalRevenue = 0;
		for(var i = 0; i < $scope.yesterdayApb.length; i++){
			var rev = $scope.yesterdayApb[i].Revenue;
			$scope.yesterdayTotalRevenue += rev;
		}
		return $scope.yesterdayTotalRevenue;
	};
	$scope.getMonthlyBrandTotalRevenue = function(){
		$scope.monthlyBrandTotalRevenue = 0;
		for(var i = 0; i < $scope.monthlyApb.length; i++){
			var rev = $scope.monthlyApb[i].Revenue;
			$scope.monthlyBrandTotalRevenue += rev;
		}
		return $scope.monthlyBrandTotalRevenue;
	};
	$scope.getMonthlyProductTotalRevenue = function(){
		$scope.monthlyProductTotalRevenue = 0;
		for(var i = 0; i < $scope.monthlyApp.length; i++){
			var rev = $scope.monthlyApp[i].Revenue;
			$scope.monthlyProductTotalRevenue += rev;
		}
		return $scope.monthlyProductTotalRevenue;
	};
	$scope.getMonthlyNetworkTotalRevenue = function(){
		$scope.monthlyNetworkTotalRevenue = 0;
		for(var i = 0; i < $scope.monthlyApn.length; i++){
			var rev = $scope.monthlyApn[i].Revenue;
			$scope.monthlyNetworkTotalRevenue += rev;
		}
		return $scope.monthlyNetworkTotalRevenue;
	};
	$scope.getTotalCost = function(){
		$scope.totalCost = 0;
		for(var i = 0; i < $scope.apd.length; i++){
			var cost = $scope.apd[i].Cost;
			$scope.totalCost += cost;
		}
		return $scope.totalCost;
	};
	$scope.getTotalBrandCost = function(){
		$scope.sumBrandCost = 0;
		for(var i = 0; i < $scope.groupedBrandCost.length; i++){
			var cost = $scope.groupedBrandCost[i].Cost;
			$scope.sumBrandCost += cost;
		}
		return $scope.sumBrandCost;
	};
	$scope.getYesterdayTotalCost = function(){
		$scope.yesterdayTotalCost = 0;
		for(var i = 0; i < $scope.yesterdayApb.length; i++){
			var cost = $scope.yesterdayApb[i].Cost;
			$scope.yesterdayTotalCost += cost;
		}
		return $scope.yesterdayTotalCost;
	};
	$scope.getMonthlyBrandTotalCost = function(){
		$scope.monthlyBrandTotalCost = 0;
		for(var i = 0; i < $scope.monthlyApb.length; i++){
			var cost = $scope.monthlyApb[i].Cost;
			$scope.monthlyBrandTotalCost += cost;
		}
		return $scope.monthlyBrandTotalCost;
	};
	$scope.getMonthlyProductTotalCost = function(){
		$scope.monthlyProductTotalCost = 0;
		for(var i = 0; i < $scope.monthlyApp.length; i++){
			var cost = $scope.monthlyApp[i].Cost;
			$scope.monthlyProductTotalCost += cost;
		}
		return $scope.monthlyProductTotalCost;
	};
	$scope.getMonthlyNetworkTotalCost = function(){
		$scope.monthlyNetworkTotalCost = 0;
		for(var i = 0; i < $scope.monthlyApn.length; i++){
			var cost = $scope.monthlyApn[i].Cost;
			$scope.monthlyNetworkTotalCost += cost;
		}
		return $scope.monthlyNetworkTotalCost;
	};
	$scope.getTotalLeads = function(){
		$scope.totalLeads = 0;
		for(var i = 0; i < $scope.apd.length; i++){
			var leads = $scope.apd[i].Leads;
			$scope.totalLeads += leads;
		}
		return $scope.totalLeads;
	};
	$scope.getYesterdayTotalLeads = function(){
		$scope.yesterdayTotalLeads = 0;
		for(var i = 0; i < $scope.yesterdayApb.length; i++){
			var leads = $scope.yesterdayApb[i].Leads;
			$scope.yesterdayTotalLeads += leads;
		}
		return $scope.yesterdayTotalLeads;
	};
	$scope.getMonthlyBrandTotalLeads = function(){
		$scope.monthlyBrandTotalLeads = 0;
		for(var i = 0; i < $scope.monthlyApb.length; i++){
			var leads = $scope.monthlyApb[i].Leads;
			$scope.monthlyBrandTotalLeads += leads;
		}
		return $scope.monthlyBrandTotalLeads;
	};
	$scope.getMonthlyProductTotalLeads = function(){
		$scope.monthlyProductTotalLeads = 0;
		for(var i = 0; i < $scope.monthlyApp.length; i++){
			var leads = $scope.monthlyApp[i].Leads;
			$scope.monthlyProductTotalLeads += leads;
		}
		return $scope.monthlyProductTotalLeads;
	};
	$scope.getMonthlyNetworkTotalLeads = function(){
		$scope.monthlyNetworkTotalLeads = 0;
		for(var i = 0; i < $scope.monthlyApn.length; i++){
			var leads = $scope.monthlyApn[i].Leads;
			$scope.monthlyNetworkTotalLeads += leads;
		}
		return $scope.monthlyNetworkTotalLeads;
	};
	$scope.yesterdaySort = function(propertyName) {
        if ($scope.orderPropertyYesterday === propertyName) {
            $scope.orderPropertyYesterday = '-' + propertyName;
        } else if ($scope.orderPropertyYesterday === '-' + propertyName) {
            $scope.orderPropertyYesterday = propertyName;
        } else {
            $scope.orderPropertyYesterday = propertyName;
        }
    };
    $scope.monthlyCartSort = function(propertyName) {
        if ($scope.orderPropertyMonthlyCart === propertyName) {
            $scope.orderPropertyMonthlyCart = '-' + propertyName;
        } else if ($scope.orderPropertyMonthlyCart === '-' + propertyName) {
            $scope.orderPropertyMonthlyCart = propertyName;
        } else {
            $scope.orderPropertyMonthlyCart = propertyName;
        }
    };
    $scope.monthlyProductSort = function(propertyName) {
        if ($scope.orderPropertyMonthlyProduct === propertyName) {
            $scope.orderPropertyMonthlyProduct = '-' + propertyName;
        } else if ($scope.orderPropertyMonthlyProduct === '-' + propertyName) {
            $scope.orderPropertyMonthlyProduct = propertyName;
        } else {
            $scope.orderPropertyMonthlyProduct = propertyName;
        }
    };
    $scope.monthlyNetworkSort = function(propertyName) {
        if ($scope.orderPropertyMonthlyNetwork === propertyName) {
            $scope.orderPropertyMonthlyNetwork = '-' + propertyName;
        } else if ($scope.orderPropertyMonthlyNetwork === '-' + propertyName) {
            $scope.orderPropertyMonthlyNetwork = propertyName;
        } else {
            $scope.orderPropertyMonthlyNetwork = propertyName;
        }
    };
	$scope.optionsBrand = {
		title: {
				enable: true,
				text: "Brands"
        },
        chart: {
            type: 'pieChart',
            
            height: 300,
            x: function(d){return d.BrandName;},
            y: function(d){return (d.Revenue);},
            valueFormat: function(d){
                return "$"+d3.format(',.2f')(d);
            },
            showLabels: true,
            showValues: true,
            duration: 500,
            pie: {
				margin: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
            },
            legend: {
				rightAlign: true,
				maxKeyLength: 10,
				align: true,
                margin: {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 0
                }
            },
            legendPosition: 'right',
            // labelSunbeamLayout: true,
            labelsOutside: true,
            labelType: "value",
            labelThreshold: 0.01,
            tooltip: {
              contentGenerator: function(d) { return d.data.BrandName+' ROI: '+((d.data.Revenue/d.data.Cost)*100).toFixed(2)+'%'; }
            }
        }
    };
    $scope.optionsProduct = {
		title: {
				enable: true,
				text: "Products"
        },
        chart: {
            type: 'pieChart',

            height: 300,
            x: function(d){return d.ProductName;},
            y: function(d){return (d.Revenue);},
            valueFormat: function(d){
                return "$"+d3.format(',.2f')(d);
            },
            showLabels: true,
            showValues: true,
            duration: 500,
            pie: {
				margin: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
            },
            legend: {
				rightAlign: true,
				maxKeyLength: 10,
				align: true,
                    margin: {
                        top: 5,
                        right: 0,
                        bottom: 5,
                        left: 0
                    }
                  },
                  legendPosition: 'right',
            // labelSunbeamLayout: true,
            labelsOutside: true,
            labelType: "value",
            labelThreshold: 0.01,
            tooltip: {
              contentGenerator: function(d) { return d.data.ProductName+' ROI: '+((d.data.Revenue/d.data.Cost)*100).toFixed(2)+'%'; }
            }
        }
    };
    $scope.optionsNetwork = {
		title: {
				enable: true,
				text: "Networks"
        },
        chart: {
            type: 'pieChart',

            height: 300,
            x: function(d){return d.NetworkName;},
            y: function(d){return (d.Revenue);},
            valueFormat: function(d){
                return "$"+d3.format(',.2f')(d);
            },
            showLabels: true,
            showValues: true,
            duration: 500,
            pie: {
				margin: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
            },
            legend: {
				rightAlign: true,
				maxKeyLength: 10,
				align: true,
                    margin: {
                        top: 5,
                        right: 0,
                        bottom: 5,
                        left: 0
                    }
                  },
                  legendPosition: 'right',
            // labelSunbeamLayout: true,
            labelsOutside: true,
            labelType: "value",
            labelThreshold: 0.01,
            tooltip: {
              contentGenerator: function(d) { return d.data.NetworkName+' ROI: '+((d.data.Revenue/d.data.Cost)*100).toFixed(2)+'%'; }
            }
        }
    };
    $scope.optionsDevice = {
		title: {
				enable: true,
				text: "Devices"
        },
        chart: {
            type: 'pieChart',

            height: 300,
            x: function(d){return d.Device;},
            y: function(d){return (d.Revenue);},
            valueFormat: function(d){
                return "$"+d3.format(',.2f')(d);
            },
            showLabels: true,
            showValues: true,
            duration: 500,
            pie: {
				margin: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
            },
            legend: {
				rightAlign: true,
				maxKeyLength: 10,
				align: true,
                    margin: {
                        top: 5,
                        right: 0,
                        bottom: 5,
                        left: 0
                    }
                  },
			legendPosition: 'right',
            // labelSunbeamLayout: true,
            labelsOutside: true,
            labelType: "value",
            labelThreshold: 0.01,
            tooltip: {
              contentGenerator: function(d) { return d.data.Device+' ROI: '+((d.data.Revenue/d.data.Cost)*100).toFixed(2)+'%'; }
            }
        }
    };
    $scope.transferViewYesterdayBrand = function(bname){
		$state.go('searchPerformances').then(function(){
			jQuery(".nav").removeClass("active");
			jQuery(".sp").addClass("active");
			for(var i=0; i < $scope.brandsList.length; i++){
				if($scope.brandsList[i].BrandName == bname){
					$scope.brandsList[i].Checked = true;
				}
				else{
					$scope.brandsList[i].Checked = false;
				}
			}
			$scope.getProductForBrandSearch();
			var checkedProducts = [];
			var checkedNetworks = [];
			var checkedDevices = [];
			var checkedBrand = [];
			var date = new Date();
			$scope.firstDay.value = $filter('date')(date.setDate(date.getDate() - 1), 'yyyy-MM-dd');
			$scope.lastDay.value = $scope.firstDay.value;
			for(var i=0; i<$scope.productsListInSearch.length; i++){
				if($scope.productsListInSearch[i].Checked === true){
					checkedProducts.push($scope.productsListInSearch[i].ID);
				}
			}
			for(var j=0; j<$scope.networksList.length; j++){
				if($scope.networksList[j].Checked === true){
					checkedNetworks.push($scope.networksList[j].ID);
				}
			}
			for(var k=0; k<$scope.deviceList.length; k++){
				if($scope.deviceList[k].Checked === true){
					checkedDevices.push($scope.deviceList[k].Name);
				}
			}
			for(var l=0; l<$scope.brandsList.length; l++){
				if($scope.brandsList[l].Checked === true){
					checkedBrand.push($scope.brandsList[l].ID);
				}
			}
			var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php?product="+checkedProducts+"&network="+checkedNetworks+"&device="+checkedDevices+"&brand="+checkedBrand;
			$http({
				method: 'POST',
				url: searchURL,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					"from" : $scope.firstDay.value,
					"to" : $scope.lastDay.value
				}
			})
				.then(function (response) {
					$scope.performanceData = response.data.records;
					$scope.filledDate = [];
					//all performance data
					(function () {
						var current = null;
						var cnt = 0;
						var cost = 0;
						var revenue = 0;
						var leads = 0;
						for (var i = 0; i < $scope.performanceData.length; i++) {
							if ($scope.performanceData[i].Date != current) {
								if (cnt > 0) {
									$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
								}
								cnt = 1;
								current = $scope.performanceData[i].Date;
								cost = parseFloat($scope.performanceData[i].Cost);
								revenue = parseFloat($scope.performanceData[i].Revenue);
								leads = parseFloat($scope.performanceData[i].Leads);
							} else {
								cnt++;
								cost += parseFloat($scope.performanceData[i].Cost);
								revenue += parseFloat($scope.performanceData[i].Revenue);
								leads += parseFloat($scope.performanceData[i].Leads);
							}
						}
						if (cnt > 0) {
							$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
						}
						$scope.getTotalCost();
						$scope.getTotalRevenue();
						$scope.getTotalLeads();
					})();

					var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
					var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
					var dupeDate = false;
					var triggered = false;
					for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
						if($scope.apd.length === 0){
							$scope.filledDate.push({ Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
						}
						if($scope.apd.length > 0 && triggered === false){
							for(var e = 0; e < $scope.apd.length; e++){
								if($filter('date')(d, 'yyyy-MM-dd') == $scope.apd[e].Date) {
									triggered = true;
									$scope.filledDate.push({Date: $scope.apd[e].Date, Cost: $scope.apd[e].Cost, Revenue: $scope.apd[e].Revenue, Leads: $scope.apd[e].Leads});
								}
								else {
									for(var f = 0; f < $scope.filledDate.length; f++){
										if($scope.filledDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
											dupeDate = true;
										}
										else {
											dupeDate = false;
										}
									}
								}
							}
						}
						if(dupeDate === false && $scope.apd.length !== 0 && triggered === false){
							$scope.filledDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
						}
						dupeDate = false;
						triggered = false;
					}
					//all performance data for brand
					(function () {
						var current = null;
						var cnt = 0;
						var cost = 0;
						var revenue = 0;
						var leads = 0;
						var sorted = $filter('orderBy')($scope.performanceData, 'BrandName');
						for (var i = 0; i < sorted.length; i++) {
							if (sorted[i].BrandName != current) {
								if (cnt > 0) {
									$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
								}
								cnt = 1;
								current = sorted[i].BrandName;
								cost = parseFloat(sorted[i].Cost);
								revenue = parseFloat(sorted[i].Revenue);
								leads = parseFloat(sorted[i].Leads);
							} else {
								cnt++;
								cost += parseFloat(sorted[i].Cost);
								revenue += parseFloat(sorted[i].Revenue);
								leads += parseFloat(sorted[i].Leads);
							}
						}
						if (cnt > 0) {
							$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
						}
					})();

					//all performance data for product
					(function () {
						var current = null;
						var cnt = 0;
						var cost = 0;
						var revenue = 0;
						var leads = 0;
						var sorted = $filter('orderBy')($scope.performanceData, 'ProductName');
						for (var i = 0; i < sorted.length; i++) {
							if (sorted[i].ProductName != current) {
								if (cnt > 0) {
									$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
								}
								cnt = 1;
								current = sorted[i].ProductName;
								cost = parseFloat(sorted[i].Cost);
								revenue = parseFloat(sorted[i].Revenue);
								leads = parseFloat(sorted[i].Leads);
							} else {
								cnt++;
								cost += parseFloat(sorted[i].Cost);
								revenue += parseFloat(sorted[i].Revenue);
								leads += parseFloat(sorted[i].Leads);
							}
						}
						if (cnt > 0) {
							$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
						}
					})();
					//all performance data for network
					(function () {
						var current = null;
						var cnt = 0;
						var cost = 0;
						var revenue = 0;
						var leads = 0;
						var sorted = $filter('orderBy')($scope.performanceData, 'NetworkName');
						for (var i = 0; i < sorted.length; i++) {
							if (sorted[i].NetworkName != current) {
								if (cnt > 0) {
									$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
								}
								cnt = 1;
								current = sorted[i].NetworkName;
								cost = parseFloat(sorted[i].Cost);
								revenue = parseFloat(sorted[i].Revenue);
								leads = parseFloat(sorted[i].Leads);
							} else {
								cnt++;
								cost += parseFloat(sorted[i].Cost);
								revenue += parseFloat(sorted[i].Revenue);
								leads += parseFloat(sorted[i].Leads);
							}
						}
						if (cnt > 0) {
							$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
						}
					})();
					//all performance data for device
					(function () {
						var current = null;
						var cnt = 0;
						var cost = 0;
						var revenue = 0;
						var leads = 0;
						var sorted = $filter('orderBy')($scope.performanceData, 'Device');

						for (var i = 0; i < sorted.length; i++) {
							if (sorted[i].Device != current) {
								if (cnt > 0) {
									$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
								}
								cnt = 1;
								current = sorted[i].Device;
								cost = parseFloat(sorted[i].Cost);
								revenue = parseFloat(sorted[i].Revenue);
								leads = parseFloat(sorted[i].Leads);
							} else {
								cnt++;
								cost += parseFloat(sorted[i].Cost);
								revenue += parseFloat(sorted[i].Revenue);
								leads += parseFloat(sorted[i].Leads);
							}
						}
						if (cnt > 0) {
							$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
						}
					})();
				})
				.then(function(){
					$http({
						method: 'POST',
						url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php?brand="+checkedBrand,
						headers: {
							'Content-Type': 'application/json'
						},
						data: {
							"from" : $scope.firstDay.value,
							"to" : $scope.lastDay.value
						}
					})
						.then(function (response) {
							$scope.cartPerformanceData = response.data.records;
							$scope.filledCartDate = [];
							//all performance data for brand
							(function () {
								var current = null;
								var cnt = 0;
								var revenue = 0;
								var sorted = $filter('orderBy')($scope.cartPerformanceData, 'BrandName');
								for (var i = 0; i < $scope.cartPerformanceData.length; i++) {
									if ($scope.cartPerformanceData[i].Date != current) {
	    								if (cnt > 0) {
	    									$scope.cpb.push({Date: current, Revenue: revenue});
	    								}
	    								cnt = 1;
	    								current = $scope.cartPerformanceData[i].Date;
	    								revenue = parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							} else {
	    								cnt++;
	    								revenue += parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							}
	    						}
	    						if (cnt > 0) {
	    							$scope.cpb.push({Date: current, Revenue: revenue});
	    						}
							})();
							$scope.groupCartPerformance();
							$scope.getTotalCartRevenue();
	    					
							$scope.cartROI = ($scope.totalCartRevenue/$scope.totalCost)*100;
							var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
							var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
							var dupeDate = false;
							var triggered = false;
							var roiMatch = false;
							for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    						if($scope.cpb.length == 0){
	    							$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						if($scope.cpb.length > 0 && triggered === false){
	    							for(var e = 0; e < $scope.cpb.length; e++){
	    							    if($filter('date')(d, 'yyyy-MM-dd') == $scope.cpb[e].Date) {
	    							    	triggered = true;
	    							        $scope.filledCartDate.push({Date: $scope.cpb[e].Date, Revenue: $scope.cpb[e].Revenue});
	    							    }
	    							    else {
	    							    	for(var f = 0; f < $scope.filledCartDate.length; f++){
	    							    		if($scope.filledCartDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    							    			dupeDate = true;
	    							    		}
	    							    		else {
	    							    			dupeDate = false;
	    							    		}
	    							    	}
	    							    }
	    							}
	    						}
	    						if(dupeDate === false && $scope.cpb.length != 0 && triggered === false){					
	    							$scope.filledCartDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						dupeDate = false;
	    						triggered = false;
	    					}
	    					
	    					for(var i = 0; i < $scope.filledCartDate.length; i++){
	    						for(var j = 0; j < $scope.filledDate.length; j++){
	    							if($scope.filledCartDate[i].Date == $scope.filledDate[j].Date){
	    								$scope.filledCartDate[i].ROI = ($scope.filledCartDate[i].Revenue/$scope.filledDate[j].Cost)*100;
	    							}
	    						}
	    					}
	    				})
	    		});
	    		
	    		$scope.apd = [];
	    		$scope.apb = [];
	    		$scope.app = [];
	    		$scope.apn = [];
	    		$scope.cpb = [];
	    		$scope.dailyCpd = [];
	    		$scope.apDevice = [];
    			
    	})
    };
    $scope.transferViewMonthlyBrand = function(bname){
    	$state.go('searchPerformances').then(function(){
    		jQuery(".nav").removeClass("active");
    		jQuery(".sp").addClass("active"); 
	    	for(var i=0; i < $scope.brandsList.length; i++){
	    		if($scope.brandsList[i].BrandName == bname){
	    			$scope.brandsList[i].Checked = true;
	    		}
	    		else{
	    			$scope.brandsList[i].Checked = false;
	    		}
	    	}
	    	$scope.getProductForBrandSearch();
	    	var checkedProducts = [];
	    	var checkedNetworks = [];
	    	var checkedDevices = [];
	    	var checkedBrand = [];

	    	$scope.firstDay.value = $filter('date')(new Date(y, m, 1), 'yyyy-MM-dd');
	    	$scope.lastDay.value = $filter('date')(new Date(y, m + 1, 0), 'yyyy-MM-dd');
	    	
	    	for(var i=0; i<$scope.productsListInSearch.length; i++){
	    		if($scope.productsListInSearch[i].Checked === true){
	    			checkedProducts.push($scope.productsListInSearch[i].ID);
	    		}
	    		
	    	}
	    	for(var j=0; j<$scope.networksList.length; j++){
	    		if($scope.networksList[j].Checked === true){
	    			checkedNetworks.push($scope.networksList[j].ID);
	    		}
	    	}
	    	for(var k=0; k<$scope.deviceList.length; k++){
	    		if($scope.deviceList[k].Checked === true){
	    			checkedDevices.push($scope.deviceList[k].Name);
	    		}
	    	}
	    	for(var l=0; l<$scope.brandsList.length; l++){
	    		if($scope.brandsList[l].Checked === true){
	    			checkedBrand.push($scope.brandsList[l].ID);
	    		}
	    	}
	    	var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php?product="+checkedProducts+"&network="+checkedNetworks+"&device="+checkedDevices+"&brand="+checkedBrand;
	    	$http({
	    		method: 'POST',
	    		url: searchURL,
	    		headers: {
	    			'Content-Type': 'application/json'
	    		},
	    		data: {
	    			"from" : $scope.firstDay.value,
	    			"to" : $scope.lastDay.value
	    		}
	    	})
	    	
	    		.then(function (response) {
	    			$scope.performanceData = response.data.records;
	    			$scope.filledDate = [];
	    			
	    			//all performance data
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				for (var i = 0; i < $scope.performanceData.length; i++) {
	    					
	    					if ($scope.performanceData[i].Date != current) {
	    						if (cnt > 0) {
	    							$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = $scope.performanceData[i].Date;
	    						cost = parseFloat($scope.performanceData[i].Cost);
	    						revenue = parseFloat($scope.performanceData[i].Revenue);
	    						leads = parseFloat($scope.performanceData[i].Leads);

	    					} else {
	    						cnt++;
	    						cost += parseFloat($scope.performanceData[i].Cost);
	    						revenue += parseFloat($scope.performanceData[i].Revenue);
	    						leads += parseFloat($scope.performanceData[i].Leads);

	    					}

	    				}
	    				if (cnt > 0) {
	    					$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});

	    				}
	    				$scope.getTotalCost();
	    				$scope.getTotalRevenue();
	    				$scope.getTotalLeads();
	    			})();

	    			var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
	    			var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
	    			var dupeDate = false;
	    			var triggered = false;
	    			for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    				if($scope.apd.length == 0){
	    					$scope.filledDate.push({ Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
	    				}
	    				if($scope.apd.length > 0 && triggered === false)
	    				for(var e = 0; e < $scope.apd.length; e++){
	    				    if($filter('date')(d, 'yyyy-MM-dd') == $scope.apd[e].Date) {
	    				    	triggered = true;
	    				        $scope.filledDate.push({Date: $scope.apd[e].Date, Cost: $scope.apd[e].Cost, Revenue: $scope.apd[e].Revenue, Leads: $scope.apd[e].Leads});
	    				    }
	    				    else {
	    				    	for(var f = 0; f < $scope.filledDate.length; f++){
	    				    		if($scope.filledDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    				    			dupeDate = true;
	    				    		}
	    				    		else {
	    				    			dupeDate = false;
	    				    		}
	    				    	}
	    				    }
	    				}
	    				if(dupeDate === false && $scope.apd.length != 0 && triggered === false){					
	    					$scope.filledDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
	    				}
	    				dupeDate = false;
	    				triggered = false;
	    			}
	    			//all performance data for brand
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'BrandName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].BrandName != current) {
	    						if (cnt > 0) {
	    							$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].BrandName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for product
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'ProductName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].ProductName != current) {
	    						if (cnt > 0) {
	    							$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].ProductName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for network
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'NetworkName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].NetworkName != current) {
	    						if (cnt > 0) {
	    							$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].NetworkName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for device
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'Device');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].Device != current) {
	    						if (cnt > 0) {
	    							$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].Device;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();
	    		})
	    		.then(function(){
	    			$http({
	    				method: 'POST',
	    				url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php?brand="+checkedBrand,
	    				headers: {
	    					'Content-Type': 'application/json'
	    				},
	    				data: {
	    					"from" : $scope.firstDay.value,
	    					"to" : $scope.lastDay.value
	    				}
	    			})
	    				.then(function (response) {
	    					$scope.cartPerformanceData = response.data.records;
	    					$scope.filledCartDate = [];
	    					
	    					//all performance data for brand
	    					(function () {
	    						var current = null;
	    						var cnt = 0;
	    						var revenue = 0;
	    						var sorted = $filter('orderBy')($scope.cartPerformanceData, 'BrandName');

	    						for (var i = 0; i < $scope.cartPerformanceData.length; i++) {
	    							if ($scope.cartPerformanceData[i].Date != current) {
	    								if (cnt > 0) {
	    									$scope.cpb.push({Date: current, Revenue: revenue});
	    								}
	    								cnt = 1;
	    								current = $scope.cartPerformanceData[i].Date;
	    								revenue = parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							} else {
	    								cnt++;
	    								revenue += parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							}
	    						}
	    						if (cnt > 0) {
	    							$scope.cpb.push({Date: current, Revenue: revenue});
	    						}
	    					})();
	    					$scope.groupCartPerformance();
	    					$scope.getTotalCartRevenue();
	    					
	    					$scope.cartROI = ($scope.totalCartRevenue/$scope.totalCost)*100;
	    					var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
	    					var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
	    					var dupeDate = false;
	    					var triggered = false;
	    					var roiMatch = false;
	    					for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    						if($scope.cpb.length == 0){
	    							$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						if($scope.cpb.length > 0 && triggered === false){
	    							for(var e = 0; e < $scope.cpb.length; e++){
	    							    if($filter('date')(d, 'yyyy-MM-dd') == $scope.cpb[e].Date) {
	    							    	triggered = true;
	    							        $scope.filledCartDate.push({Date: $scope.cpb[e].Date, Revenue: $scope.cpb[e].Revenue});
	    							    }
	    							    else {
	    							    	for(var f = 0; f < $scope.filledCartDate.length; f++){
	    							    		if($scope.filledCartDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    							    			dupeDate = true;
	    							    		}
	    							    		else {
	    							    			dupeDate = false;
	    							    		}
	    							    	}
	    							    }
	    							}
	    						}
	    						if(dupeDate === false && $scope.cpb.length != 0 && triggered === false){					
	    							$scope.filledCartDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						dupeDate = false;
	    						triggered = false;
	    					}
	    					
	    					for(var i = 0; i < $scope.filledCartDate.length; i++){
	    						for(var j = 0; j < $scope.filledDate.length; j++){
	    							if($scope.filledCartDate[i].Date == $scope.filledDate[j].Date){
	    								$scope.filledCartDate[i].ROI = ($scope.filledCartDate[i].Revenue/$scope.filledDate[j].Cost)*100;
	    							}
	    						}
	    					}
	    				})
	    		});
	    		
	    		$scope.apd = [];
	    		$scope.apb = [];
	    		$scope.app = [];
	    		$scope.apn = [];
	    		$scope.cpb = [];
	    		$scope.dailyCpd = [];
	    		$scope.apDevice = [];
    		
    	})
    };
    $scope.transferViewMonthlyProduct = function(pname){
    	$state.go('searchPerformances').then(function(){
    		jQuery(".nav").removeClass("active");
    		jQuery(".sp").addClass("active"); 
	    	for(var i=0; i < $scope.productsListInSearch.length; i++){
	    		if($scope.productsListInSearch[i].Name == pname){
	    			$scope.productsListInSearch[i].Checked = true;
	    		}
	    		else{
	    			$scope.productsListInSearch[i].Checked = false;
	    		}
	    	}
	    	var checkedProducts = [];
	    	var checkedNetworks = [];
	    	var checkedDevices = [];
	    	var checkedBrand = [];

	    	$scope.firstDay.value = $filter('date')(new Date(y, m, 1), 'yyyy-MM-dd');
	    	$scope.lastDay.value = $filter('date')(new Date(y, m + 1, 0), 'yyyy-MM-dd');

	    	for(var i=0; i<$scope.productsListInSearch.length; i++){
	    		if($scope.productsListInSearch[i].Checked === true){
	    			checkedProducts.push($scope.productsListInSearch[i].ID);
	    		}
	    		
	    	}
	    	for(var j=0; j<$scope.networksList.length; j++){
	    		if($scope.networksList[j].Checked === true){
	    			checkedNetworks.push($scope.networksList[j].ID);
	    		}
	    	}
	    	for(var k=0; k<$scope.deviceList.length; k++){
	    		if($scope.deviceList[k].Checked === true){
	    			checkedDevices.push($scope.deviceList[k].Name);
	    		}
	    	}
	    	for(var l=0; l<$scope.brandsList.length; l++){
	    		if($scope.brandsList[l].Checked === true){
	    			checkedBrand.push($scope.brandsList[l].ID);
	    		}
	    	}
	    	var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php?product="+checkedProducts+"&network="+checkedNetworks+"&device="+checkedDevices+"&brand="+checkedBrand;
	    	$http({
	    		method: 'POST',
	    		url: searchURL,
	    		headers: {
	    			'Content-Type': 'application/json'
	    		},
	    		data: {
	    			"from" : $scope.firstDay.value,
	    			"to" : $scope.lastDay.value
	    		}
	    	})
	    	
	    		.then(function (response) {
	    			$scope.performanceData = response.data.records;
	    			$scope.filledDate = [];
	    			
	    			//all performance data
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				for (var i = 0; i < $scope.performanceData.length; i++) {
	    					
	    					if ($scope.performanceData[i].Date != current) {
	    						if (cnt > 0) {
	    							$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = $scope.performanceData[i].Date;
	    						cost = parseFloat($scope.performanceData[i].Cost);
	    						revenue = parseFloat($scope.performanceData[i].Revenue);
	    						leads = parseFloat($scope.performanceData[i].Leads);

	    					} else {
	    						cnt++;
	    						cost += parseFloat($scope.performanceData[i].Cost);
	    						revenue += parseFloat($scope.performanceData[i].Revenue);
	    						leads += parseFloat($scope.performanceData[i].Leads);

	    					}

	    				}
	    				if (cnt > 0) {
	    					$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});

	    				}
	    				$scope.getTotalCost();
	    				$scope.getTotalRevenue();
	    				$scope.getTotalLeads();
	    			})();

	    			var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
	    			var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
	    			var dupeDate = false;
	    			var triggered = false;
	    			for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    				if($scope.apd.length == 0){
	    					$scope.filledDate.push({ Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
	    				}
	    				if($scope.apd.length > 0 && triggered === false)
	    				for(var e = 0; e < $scope.apd.length; e++){
	    				    if($filter('date')(d, 'yyyy-MM-dd') == $scope.apd[e].Date) {
	    				    	triggered = true;
	    				        $scope.filledDate.push({Date: $scope.apd[e].Date, Cost: $scope.apd[e].Cost, Revenue: $scope.apd[e].Revenue, Leads: $scope.apd[e].Leads});
	    				    }
	    				    else {
	    				    	for(var f = 0; f < $scope.filledDate.length; f++){
	    				    		if($scope.filledDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    				    			dupeDate = true;
	    				    		}
	    				    		else {
	    				    			dupeDate = false;
	    				    		}
	    				    	}
	    				    }
	    				}
	    				if(dupeDate === false && $scope.apd.length != 0 && triggered === false){					
	    					$scope.filledDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
	    				}
	    				dupeDate = false;
	    				triggered = false;
	    			}
	    			//all performance data for brand
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'BrandName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].BrandName != current) {
	    						if (cnt > 0) {
	    							$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].BrandName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for product
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'ProductName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].ProductName != current) {
	    						if (cnt > 0) {
	    							$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].ProductName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for network
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'NetworkName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].NetworkName != current) {
	    						if (cnt > 0) {
	    							$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].NetworkName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for device
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'Device');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].Device != current) {
	    						if (cnt > 0) {
	    							$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].Device;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();
	    		})
	    		.then(function(){
	    			$http({
	    				method: 'POST',
	    				url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php?brand="+checkedBrand,
	    				headers: {
	    					'Content-Type': 'application/json'
	    				},
	    				data: {
	    					"from" : $scope.firstDay.value,
	    					"to" : $scope.lastDay.value
	    				}
	    			})
	    			
	    				.then(function (response) {
	    					$scope.cartPerformanceData = response.data.records;
	    					$scope.filledCartDate = [];
	    					
	    					//all performance data for brand
	    					(function () {
	    						var current = null;
	    						var cnt = 0;
	    						var revenue = 0;
	    						var sorted = $filter('orderBy')($scope.cartPerformanceData, 'BrandName');

	    						for (var i = 0; i < $scope.cartPerformanceData.length; i++) {
	    							if ($scope.cartPerformanceData[i].Date != current) {
	    								if (cnt > 0) {
	    									$scope.cpb.push({Date: current, Revenue: revenue});
	    								}
	    								cnt = 1;
	    								current = $scope.cartPerformanceData[i].Date;
	    								revenue = parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							} else {
	    								cnt++;
	    								revenue += parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							}
	    						}
	    						if (cnt > 0) {
	    							$scope.cpb.push({Date: current, Revenue: revenue});
	    						}
	    					})();
	    					$scope.groupCartPerformance();
	    					$scope.getTotalCartRevenue();
	    					
	    					$scope.cartROI = ($scope.totalCartRevenue/$scope.totalCost)*100;
	    					var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
	    					var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
	    					var dupeDate = false;
	    					var triggered = false;
	    					var roiMatch = false;
	    					for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    						if($scope.cpb.length == 0){
	    							$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						if($scope.cpb.length > 0 && triggered === false){
	    							for(var e = 0; e < $scope.cpb.length; e++){
	    							    if($filter('date')(d, 'yyyy-MM-dd') == $scope.cpb[e].Date) {
	    							    	triggered = true;
	    							        $scope.filledCartDate.push({Date: $scope.cpb[e].Date, Revenue: $scope.cpb[e].Revenue});
	    							    }
	    							    else {
	    							    	for(var f = 0; f < $scope.filledCartDate.length; f++){
	    							    		if($scope.filledCartDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    							    			dupeDate = true;
	    							    		}
	    							    		else {
	    							    			dupeDate = false;
	    							    		}
	    							    	}
	    							    }
	    							}
	    						}
	    						if(dupeDate === false && $scope.cpb.length != 0 && triggered === false){					
	    							$scope.filledCartDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						dupeDate = false;
	    						triggered = false;
	    					}
	    					
	    					for(var i = 0; i < $scope.filledCartDate.length; i++){
	    						for(var j = 0; j < $scope.filledDate.length; j++){
	    							if($scope.filledCartDate[i].Date == $scope.filledDate[j].Date){
	    								$scope.filledCartDate[i].ROI = ($scope.filledCartDate[i].Revenue/$scope.filledDate[j].Cost)*100;
	    							}
	    						}
	    					}
	    				})
	    		});
	    		
	    		$scope.apd = [];
	    		$scope.apb = [];
	    		$scope.app = [];
	    		$scope.apn = [];
	    		$scope.cpb = [];
	    		$scope.dailyCpd = [];
	    		$scope.apDevice = [];
    		
    	})
    };
    $scope.transferViewMonthlyNetwork = function(nname){
    	$state.go('searchPerformances').then(function(){
    		jQuery(".nav").removeClass("active");
    		jQuery(".sp").addClass("active"); 
	    	for(var i=0; i < $scope.networksList.length; i++){
	    		if($scope.networksList[i].Name == nname){
	    			$scope.networksList[i].Checked = true;
	    		}
	    		else{
	    			$scope.networksList[i].Checked = false;
	    		}
	    	}
	    	$scope.firstDay.value = $filter('date')(new Date(y, m, 1), 'yyyy-MM-dd');
	    	$scope.lastDay.value = $filter('date')(new Date(y, m + 1, 0), 'yyyy-MM-dd');


	    	var checkedProducts = [];
	    	var checkedNetworks = [];
	    	var checkedDevices = [];
	    	var checkedBrand = [];
	    	for(var i=0; i<$scope.productsListInSearch.length; i++){
	    		if($scope.productsListInSearch[i].Checked === true){
	    			checkedProducts.push($scope.productsListInSearch[i].ID);
	    		}
	    		
	    	}
	    	for(var j=0; j<$scope.networksList.length; j++){
	    		if($scope.networksList[j].Checked === true){
	    			checkedNetworks.push($scope.networksList[j].ID);
	    		}
	    	}
	    	for(var k=0; k<$scope.deviceList.length; k++){
	    		if($scope.deviceList[k].Checked === true){
	    			checkedDevices.push($scope.deviceList[k].Name);
	    		}
	    	}
	    	for(var l=0; l<$scope.brandsList.length; l++){
	    		if($scope.brandsList[l].Checked === true){
	    			checkedBrand.push($scope.brandsList[l].ID);
	    		}
	    	}
	    	var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php?product="+checkedProducts+"&network="+checkedNetworks+"&device="+checkedDevices+"&brand="+checkedBrand;
	    	$http({
	    		method: 'POST',
	    		url: searchURL,
	    		headers: {
	    			'Content-Type': 'application/json'
	    		},
	    		data: {
	    			"from" : $scope.firstDay.value,
	    			"to" : $scope.lastDay.value
	    		}
	    	})
	    	
	    		.then(function (response) {
	    			$scope.performanceData = response.data.records;
	    			$scope.filledDate = [];
	    			
	    			//all performance data
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				for (var i = 0; i < $scope.performanceData.length; i++) {
	    					
	    					if ($scope.performanceData[i].Date != current) {
	    						if (cnt > 0) {
	    							$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = $scope.performanceData[i].Date;
	    						cost = parseFloat($scope.performanceData[i].Cost);
	    						revenue = parseFloat($scope.performanceData[i].Revenue);
	    						leads = parseFloat($scope.performanceData[i].Leads);

	    					} else {
	    						cnt++;
	    						cost += parseFloat($scope.performanceData[i].Cost);
	    						revenue += parseFloat($scope.performanceData[i].Revenue);
	    						leads += parseFloat($scope.performanceData[i].Leads);

	    					}

	    				}
	    				if (cnt > 0) {
	    					$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});

	    				}
	    				$scope.getTotalCost();
	    				$scope.getTotalRevenue();
	    				$scope.getTotalLeads();
	    			})();

	    			var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
	    			var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
	    			var dupeDate = false;
	    			var triggered = false;
	    			for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    				if($scope.apd.length == 0){
	    					$scope.filledDate.push({ Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
	    				}
	    				if($scope.apd.length > 0 && triggered === false)
	    				for(var e = 0; e < $scope.apd.length; e++){
	    				    if($filter('date')(d, 'yyyy-MM-dd') == $scope.apd[e].Date) {
	    				    	triggered = true;
	    				        $scope.filledDate.push({Date: $scope.apd[e].Date, Cost: $scope.apd[e].Cost, Revenue: $scope.apd[e].Revenue, Leads: $scope.apd[e].Leads});
	    				    }
	    				    else {
	    				    	for(var f = 0; f < $scope.filledDate.length; f++){
	    				    		if($scope.filledDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    				    			dupeDate = true;
	    				    		}
	    				    		else {
	    				    			dupeDate = false;
	    				    		}
	    				    	}
	    				    }
	    				}
	    				if(dupeDate === false && $scope.apd.length != 0 && triggered === false){					
	    					$scope.filledDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
	    				}
	    				dupeDate = false;
	    				triggered = false;
	    			}
	    			//all performance data for brand
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'BrandName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].BrandName != current) {
	    						if (cnt > 0) {
	    							$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].BrandName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for product
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'ProductName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].ProductName != current) {
	    						if (cnt > 0) {
	    							$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].ProductName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for network
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'NetworkName');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].NetworkName != current) {
	    						if (cnt > 0) {
	    							$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].NetworkName;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();

	    			//all performance data for device
	    			(function () {
	    				var current = null;
	    				var cnt = 0;
	    				var cost = 0;
	    				var revenue = 0;
	    				var leads = 0;
	    				var sorted = $filter('orderBy')($scope.performanceData, 'Device');

	    				for (var i = 0; i < sorted.length; i++) {
	    					if (sorted[i].Device != current) {
	    						if (cnt > 0) {
	    							$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
	    						}
	    						cnt = 1;
	    						current = sorted[i].Device;
	    						cost = parseFloat(sorted[i].Cost);
	    						revenue = parseFloat(sorted[i].Revenue);
	    						leads = parseFloat(sorted[i].Leads);
	    					} else {
	    						cnt++;
	    						cost += parseFloat(sorted[i].Cost);
	    						revenue += parseFloat(sorted[i].Revenue);
	    						leads += parseFloat(sorted[i].Leads);
	    					}
	    				}
	    				if (cnt > 0) {
	    					$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
	    				}
	    			})();
	    		})
	    		.then(function(){
	    			$http({
	    				method: 'POST',
	    				url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php?brand="+checkedBrand,
	    				headers: {
	    					'Content-Type': 'application/json'
	    				},
	    				data: {
	    					"from" : $scope.firstDay.value,
	    					"to" : $scope.lastDay.value
	    				}
	    			})
	    			
	    				.then(function (response) {
	    					$scope.cartPerformanceData = response.data.records;
	    					$scope.filledCartDate = [];
	    					
	    					//all performance data for brand
	    					(function () {
	    						var current = null;
	    						var cnt = 0;
	    						var revenue = 0;
	    						var sorted = $filter('orderBy')($scope.cartPerformanceData, 'BrandName');

	    						for (var i = 0; i < $scope.cartPerformanceData.length; i++) {
	    							if ($scope.cartPerformanceData[i].Date != current) {
	    								if (cnt > 0) {
	    									$scope.cpb.push({Date: current, Revenue: revenue});
	    								}
	    								cnt = 1;
	    								current = $scope.cartPerformanceData[i].Date;
	    								revenue = parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							} else {
	    								cnt++;
	    								revenue += parseFloat($scope.cartPerformanceData[i].CRevenue);
	    							}
	    						}
	    						if (cnt > 0) {
	    							$scope.cpb.push({Date: current, Revenue: revenue});
	    						}
	    					})();
	    					$scope.groupCartPerformance();
	    					$scope.getTotalCartRevenue();
	    					
	    					$scope.cartROI = ($scope.totalCartRevenue/$scope.totalCost)*100;
	    					var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
	    					var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
	    					var dupeDate = false;
	    					var triggered = false;
	    					var roiMatch = false;
	    					for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
	    						if($scope.cpb.length == 0){
	    							$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						if($scope.cpb.length > 0 && triggered === false){
	    							for(var e = 0; e < $scope.cpb.length; e++){
	    							    if($filter('date')(d, 'yyyy-MM-dd') == $scope.cpb[e].Date) {
	    							    	triggered = true;
	    							        $scope.filledCartDate.push({Date: $scope.cpb[e].Date, Revenue: $scope.cpb[e].Revenue});
	    							    }
	    							    else {
	    							    	for(var f = 0; f < $scope.filledCartDate.length; f++){
	    							    		if($scope.filledCartDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
	    							    			dupeDate = true;
	    							    		}
	    							    		else {
	    							    			dupeDate = false;
	    							    		}
	    							    	}
	    							    }
	    							}
	    						}
	    						if(dupeDate === false && $scope.cpb.length != 0 && triggered === false){					
	    							$scope.filledCartDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
	    						}
	    						dupeDate = false;
	    						triggered = false;
	    					}
	    					
	    					for(var i = 0; i < $scope.filledCartDate.length; i++){
	    						for(var j = 0; j < $scope.filledDate.length; j++){
	    							if($scope.filledCartDate[i].Date == $scope.filledDate[j].Date){
	    								$scope.filledCartDate[i].ROI = ($scope.filledCartDate[i].Revenue/$scope.filledDate[j].Cost)*100;
	    							}
	    						}
	    					}
	    				})
	    		});
	    		
	    		$scope.apd = [];
	    		$scope.apb = [];
	    		$scope.app = [];
	    		$scope.apn = [];
	    		$scope.cpb = [];
	    		$scope.dailyCpd = [];
	    		$scope.apDevice = [];
    		
    	})
    };
	$scope.getBrand = function(){
		$scope.brandsList = [];
		$http.get("https://damp-river-98433.herokuapp.com/wsdl.php?method=all_brand")
			.then(function (response) {
				$scope.brandData = response.data.records;
				$scope.selectedBrand = {ID: $scope.brandData[0].ID};
				for(var i=0; i<$scope.brandData.length; i++){
					$scope.brandsList.push({ID: $scope.brandData[i].ID, BrandName: $scope.brandData[i].BrandName, Checked: true});
				}
			});
	};

	$scope.getProductForBrand = function (){
		var searchURL = "https://damp-river-98433.herokuapp.com/wsdl.php?method=all_product&brandID="+$scope.selectedBrand.ID;
		$http.get(searchURL)
			.then(function (response) {
				var v = response.data.records;
				for(var i = 0; i<v.length; i++){
					$scope.productsInBrand.push(v[i]);
					
				}
				$scope.selectedProductsInBrand = {type : $scope.productsInBrand[0].ID};
			});
		$scope.productsInBrand = [];
	};
	$scope.getProductForBrandSearch = function (){
		var checkedBrands = [];
		$scope.productsListInSearch = [];
		for(var i=0; i<$scope.brandsList.length; i++){
			if($scope.brandsList[i].Checked === true){
				checkedBrands.push($scope.brandsList[i].ID);
			}
			
		}
		var searchURL = "https://damp-river-98433.herokuapp.com/wsdl.php?method=all_product&brandID="+checkedBrands;
		$http.get(searchURL)
			.then(function (response) {
				var v = response.data.records;

				for(var i = 0; i<v.length; i++){
					$scope.productsListInSearch.push({ID: v[i].ID, BID: v[i].BID, Name: v[i].Name, Checked: true});
				}
			});

		$scope.productsInBrand = [];
	};
	$scope.clearChecks = function(x){
		for(var i = 0; i < x.length; i++){
			x[i].Checked = false;
		}
	};
	$scope.checkAll = function(x){
		for(var i = 0; i < x.length; i++){
			x[i].Checked = true;
		}
		$scope.getProductForBrandSearch();
	};
	self.addBrand = function(){
		$http({
			method: 'POST',
			url: "https://damp-river-98433.herokuapp.com/add_brand.php",
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"BrandName" : self.brand
				
			}
		})
			.then(function (response){
				if(response.data == "Connection: success!Duplicate Brand"){
					$scope.messageFailure("Brand already exists");
				} else {
					self.brand = "";
					$scope.messageSuccess("Record Successfully Added");
					$scope.getBrand();
				}
			});
	};

	self.addProduct = function(){
		$http({
			method: 'POST',
			url: "https://damp-river-98433.herokuapp.com/add_product.php",
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"BID" : $scope.selectedBrand.ID,
				"ProductName" : self.product
			}
		})
			.then(function (response){
				if(response.data == "Connection: success!Duplicate Product"){
					$scope.messageFailure("Product already exists");
					
				} else {
					
					$scope.messageSuccess("Record Successfully Added");
					self.product = "";
				}
			});
	};

	self.addNetwork = function(){
		$http({
			method: 'POST',
			url: "https://damp-river-98433.herokuapp.com/add_network.php",
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"NetworkName" : self.network
			}
		})
			.then(function (response){
				if(response.data == "Connection: success!Duplicate Network"){
					$scope.messageFailure("Network already exists");
				} else {
					
					$scope.messageSuccess("Record Successfully Added");
					self.network = "";
				}
			});
	};

	$scope.searchYesterdayPerformance = function(){
		
		var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php";
		$http({
			method: 'POST',
			url: searchURL,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"from" : $scope.yesterday.value,
				"to" : $scope.yesterday.value
			}
		})
			.then(function (response) {
				$scope.yesterdayPerformanceData = response.data.records;
				var sortedBrand = $filter('orderBy')($scope.yesterdayPerformanceData, 'BrandName');
				//all performance data
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					for (var i = 0; i < sortedBrand.length; i++) {				
						if (sortedBrand[i].BrandName != current) {
							if (cnt > 0) {
								$scope.yesterdayApb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sortedBrand[i].BrandName;
							cost = parseFloat(sortedBrand[i].Cost);
							revenue = parseFloat(sortedBrand[i].Revenue);
							leads = parseFloat(sortedBrand[i].Leads);

						} else {
							cnt++;
							cost += parseFloat(sortedBrand[i].Cost);
							revenue += parseFloat(sortedBrand[i].Revenue);
							leads += parseFloat(sortedBrand[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.yesterdayApb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
					$scope.getYesterdayTotalCost();
					$scope.getYesterdayTotalRevenue();
					$scope.getYesterdayTotalLeads();
				})();
			})
			.then(function(){
				$http({
					method: 'POST',
					url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php",
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						"from" : $scope.yesterday.value,
						"to" : $scope.yesterday.value
					}
				})
				.then(function (response) {
					$scope.yesterdayCartPerformanceData = response.data.records;										
					$scope.getYesterdayTotalCartRevenue();
					// $scope.yesterdayCartROI = ($scope.yesterdayTotalCartRevenue/$scope.yesterdayBrandTotalCost)*100;			
					//monthly cart data for brand
					(function () {
						var current = null;
						var cnt = 0;
						var revenue = 0;
						var sortedCart = $filter('orderBy')($scope.yesterdayCartPerformanceData, 'BrandName');
						for (var i = 0; i < sortedCart.length; i++) {
							if (sortedCart[i].BrandName != current) {
								if (cnt > 0) {
									$scope.yesterdayCpb.push({BrandName: current, Revenue: revenue});
								}
								cnt = 1;
								current = sortedCart[i].BrandName;
								revenue = parseFloat(sortedCart[i].CRevenue);
							} else {
								cnt++;
								revenue += parseFloat(sortedCart[i].CRevenue);
							}
						}
						if (cnt > 0) {
							$scope.yesterdayCpb.push({BrandName: current, Revenue: revenue});
						}
						for(var j = 0; j < $scope.yesterdayCpb.length; j++){
							for(var k = 0; k < $scope.yesterdayApb.length; k++){
								if($scope.yesterdayCpb[j].BrandName == $scope.yesterdayApb[k].BrandName){
									$scope.yesterdayCpb[j].Cost = $scope.yesterdayApb[k].Cost;
									
								}
							}
						}
					})();
				});
			});
			$scope.yesterdayApb = [];
			$scope.yesterdayCpb = [];
			$scope.apb = [];
			$scope.app = [];
			$scope.apn = [];
			$scope.apDevice = [];
	};

	$scope.searchMonthlyPerformance = function(){
		
		var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php";
		$http({
			method: 'POST',
			url: searchURL,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"from" : $scope.homeFirstDay.value,
				"to" : $scope.homeLastDay.value
			}
		})
		
			.then(function (response) {
				$scope.monthlyPerformanceData = response.data.records;
				var sortedBrand = $filter('orderBy')($scope.monthlyPerformanceData, 'BrandName');
				var sortedProduct = $filter('orderBy')($scope.monthlyPerformanceData, 'ProductName');
				var sortedNetwork = $filter('orderBy')($scope.monthlyPerformanceData, 'NetworkName');
				//monthly brand data
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					for (var i = 0; i < sortedBrand.length; i++) {
						if (sortedBrand[i].BrandName != current) {
							if (cnt > 0) {
								$scope.monthlyApb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sortedBrand[i].BrandName;
							cost = parseFloat(sortedBrand[i].Cost);
							revenue = parseFloat(sortedBrand[i].Revenue);
							leads = parseFloat(sortedBrand[i].Leads);
						} else {
							cnt++;
							cost += parseFloat(sortedBrand[i].Cost);
							revenue += parseFloat(sortedBrand[i].Revenue);
							leads += parseFloat(sortedBrand[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.monthlyApb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
					$scope.getMonthlyBrandTotalCost();
					$scope.getMonthlyBrandTotalRevenue();
					$scope.getMonthlyBrandTotalLeads();
				})();

				//monthly product data
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					for (var i = 0; i < sortedProduct.length; i++) {
						if (sortedProduct[i].ProductName != current) {
							if (cnt > 0) {
								$scope.monthlyApp.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sortedProduct[i].ProductName;
							cost = parseFloat(sortedProduct[i].Cost);
							revenue = parseFloat(sortedProduct[i].Revenue);
							leads = parseFloat(sortedProduct[i].Leads);
						} else {
							cnt++;
							cost += parseFloat(sortedProduct[i].Cost);
							revenue += parseFloat(sortedProduct[i].Revenue);
							leads += parseFloat(sortedProduct[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.monthlyApp.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
					$scope.getMonthlyProductTotalCost();
					$scope.getMonthlyProductTotalRevenue();
					$scope.getMonthlyProductTotalLeads();
				})();


				//monthly network data
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					for (var i = 0; i < sortedNetwork.length; i++) {
						if (sortedNetwork[i].NetworkName != current) {
							if (cnt > 0) {
								$scope.monthlyApn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sortedNetwork[i].NetworkName;
							cost = parseFloat(sortedNetwork[i].Cost);
							revenue = parseFloat(sortedNetwork[i].Revenue);
							leads = parseFloat(sortedNetwork[i].Leads);
						} else {
							cnt++;
							cost += parseFloat(sortedNetwork[i].Cost);
							revenue += parseFloat(sortedNetwork[i].Revenue);
							leads += parseFloat(sortedNetwork[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.monthlyApn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
					$scope.getMonthlyNetworkTotalCost();
					$scope.getMonthlyNetworkTotalRevenue();
					$scope.getMonthlyNetworkTotalLeads();
				})();
			})
			.then(function(){
				$http({
					method: 'POST',
					url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php",
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						"from" : $scope.homeFirstDay.value,
						"to" : $scope.homeLastDay.value
					}
				})	
					.then(function (response) {
						$scope.monthlyCartPerformanceData = response.data.records;										
						$scope.getMonthlyTotalCartRevenue();
						$scope.monthlyCartROI = ($scope.monthlyTotalCartRevenue/$scope.monthlyBrandTotalCost)*100;			
						//monthly cart data for brand
						(function () {
							var current = null;
							var cnt = 0;
							var revenue = 0;
							var sortedCart = $filter('orderBy')($scope.monthlyCartPerformanceData, 'BrandName');
							for (var i = 0; i < sortedCart.length; i++) {
								if (sortedCart[i].BrandName != current) {
									if (cnt > 0) {
										$scope.monthlyCpb.push({BrandName: current, Revenue: revenue});
									}
									cnt = 1;
									current = sortedCart[i].BrandName;
									revenue = parseFloat(sortedCart[i].CRevenue);
								} else {
									cnt++;
									revenue += parseFloat(sortedCart[i].CRevenue);
								}
							}
							if (cnt > 0) {
								$scope.monthlyCpb.push({BrandName: current, Revenue: revenue});
							}
							for(var j = 0; j < $scope.monthlyCpb.length; j++){
								for(var k = 0; k < $scope.monthlyApb.length; k++){
									if($scope.monthlyCpb[j].BrandName == $scope.monthlyApb[k].BrandName){
										$scope.monthlyCpb[j].Cost = $scope.monthlyApb[k].Cost;
										
									}
								}
							}
						})();
					});
			})
			
			$scope.monthlyApd = [];
			$scope.monthlyApb = [];
			$scope.monthlyApp = [];
			$scope.monthlyApn = [];
			$scope.monthlyCpb = [];
			$scope.apDevice = [];
	};

	$scope.searchPerformance = function(){
		jQuery('#loadingContainer').css('display', 'block');
		var checkedProducts = [];
		var checkedNetworks = [];
		var checkedDevices = [];
		var checkedBrand = [];
		for(var i=0; i<$scope.productsListInSearch.length; i++){
			if($scope.productsListInSearch[i].Checked === true){
				checkedProducts.push($scope.productsListInSearch[i].ID);
			}
			
		}
		for(var j=0; j<$scope.networksList.length; j++){
			if($scope.networksList[j].Checked === true){
				checkedNetworks.push($scope.networksList[j].ID);
			}
		}
		for(var k=0; k<$scope.deviceList.length; k++){
			if($scope.deviceList[k].Checked === true){
				checkedDevices.push($scope.deviceList[k].Name);
			}
		}
		for(var l=0; l<$scope.brandsList.length; l++){
			if($scope.brandsList[l].Checked === true){
				checkedBrand.push($scope.brandsList[l].ID);
			}
		}
		var searchURL = "https://damp-river-98433.herokuapp.com/search_performance.php?product="+checkedProducts+"&network="+checkedNetworks+"&device="+checkedDevices+"&brand="+checkedBrand;
		$http({
			method: 'POST',
			url: searchURL,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"from" : $scope.firstDay.value,
				"to" : $scope.lastDay.value
			}
		})
		
			.then(function (response) {
				$scope.performanceData = response.data.records;
				$scope.filledDate = [];
				
				//all performance data
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					for (var i = 0; i < $scope.performanceData.length; i++) {
						if ($scope.performanceData[i].Date != current) {
							if (cnt > 0) {
								$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = $scope.performanceData[i].Date;
							cost = parseFloat($scope.performanceData[i].Cost);
							revenue = parseFloat($scope.performanceData[i].Revenue);
							leads = parseFloat($scope.performanceData[i].Leads);

						} else {
							cnt++;
							cost += parseFloat($scope.performanceData[i].Cost);
							revenue += parseFloat($scope.performanceData[i].Revenue);
							leads += parseFloat($scope.performanceData[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.apd.push({Date: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
					$scope.getTotalCost();
					$scope.getTotalRevenue();
					$scope.getTotalLeads();
				})();

				var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
				var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
				var dupeDate = false;
				var triggered = false;
				for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
					if($scope.apd.length == 0){
						$scope.filledDate.push({ Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
					}
					if($scope.apd.length > 0 && triggered === false)
					for(var e = 0; e < $scope.apd.length; e++){
					    if($filter('date')(d, 'yyyy-MM-dd') == $scope.apd[e].Date) {
					    	triggered = true;
					        $scope.filledDate.push({Date: $scope.apd[e].Date, Cost: $scope.apd[e].Cost, Revenue: $scope.apd[e].Revenue, Leads: $scope.apd[e].Leads});
					    }
					    else {
					    	for(var f = 0; f < $scope.filledDate.length; f++){
					    		if($scope.filledDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
					    			dupeDate = true;
					    		}
					    		else {
					    			dupeDate = false;
					    		}
					    	}
					    }
					}
					if(dupeDate === false && $scope.apd.length != 0 && triggered === false){					
						$scope.filledDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0});
					}
					dupeDate = false;
					triggered = false;
				}
				//all performance data for brand
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					var sorted = $filter('orderBy')($scope.performanceData, 'BrandName');

					for (var i = 0; i < sorted.length; i++) {
						if (sorted[i].BrandName != current) {
							if (cnt > 0) {
								$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
								
							}
							cnt = 1;
							current = sorted[i].BrandName;
							cost = parseFloat(sorted[i].Cost);
							revenue = parseFloat(sorted[i].Revenue);
							leads = parseFloat(sorted[i].Leads);
							
						} 
						else {
							cnt++;
							cost += parseFloat(sorted[i].Cost);
							revenue += parseFloat(sorted[i].Revenue);
							leads += parseFloat(sorted[i].Leads);
							
						}
					}
					if (cnt > 0) {
						$scope.apb.push({BrandName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
				})();

				//all performance data for product
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					var sorted = $filter('orderBy')($scope.performanceData, 'ProductName');

					for (var i = 0; i < sorted.length; i++) {
						if (sorted[i].ProductName != current) {
							if (cnt > 0) {
								$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sorted[i].ProductName;
							cost = parseFloat(sorted[i].Cost);
							revenue = parseFloat(sorted[i].Revenue);
							leads = parseFloat(sorted[i].Leads);
						} else {
							cnt++;
							cost += parseFloat(sorted[i].Cost);
							revenue += parseFloat(sorted[i].Revenue);
							leads += parseFloat(sorted[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.app.push({ProductName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
				})();

				//all performance data for network
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					var sorted = $filter('orderBy')($scope.performanceData, 'NetworkName');

					for (var i = 0; i < sorted.length; i++) {
						if (sorted[i].NetworkName != current) {
							if (cnt > 0) {
								$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sorted[i].NetworkName;
							cost = parseFloat(sorted[i].Cost);
							revenue = parseFloat(sorted[i].Revenue);
							leads = parseFloat(sorted[i].Leads);
						} else {
							cnt++;
							cost += parseFloat(sorted[i].Cost);
							revenue += parseFloat(sorted[i].Revenue);
							leads += parseFloat(sorted[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.apn.push({NetworkName: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
				})();

				//all performance data for device
				(function () {
					var current = null;
					var cnt = 0;
					var cost = 0;
					var revenue = 0;
					var leads = 0;
					var sorted = $filter('orderBy')($scope.performanceData, 'Device');

					for (var i = 0; i < sorted.length; i++) {
						if (sorted[i].Device != current) {
							if (cnt > 0) {
								$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
							}
							cnt = 1;
							current = sorted[i].Device;
							cost = parseFloat(sorted[i].Cost);
							revenue = parseFloat(sorted[i].Revenue);
							leads = parseFloat(sorted[i].Leads);
						} else {
							cnt++;
							cost += parseFloat(sorted[i].Cost);
							revenue += parseFloat(sorted[i].Revenue);
							leads += parseFloat(sorted[i].Leads);
						}
					}
					if (cnt > 0) {
						$scope.apDevice.push({Device: current, Cost: cost, Revenue: revenue, Leads: leads});
					}
				})();
			})
			.then(function(){
				$http({
					method: 'POST',
					url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php?brand="+checkedBrand,
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						"from" : $scope.firstDay.value,
						"to" : $scope.lastDay.value
					}
				})
					.then(function (response) {
						$scope.cartPerformanceData = response.data.records;
						$scope.filledCartDate = [];
						
						//all performance data for brand
						(function () {
							var current = null;
							
							var cnt = 0;
							var revenue = 0;
							

							var sorted = $filter('orderBy')($scope.cartPerformanceData, 'BrandName');

							for (var i = 0; i < $scope.cartPerformanceData.length; i++) {
								if ($scope.cartPerformanceData[i].Date != current) {
									if (cnt > 0) {
										$scope.cpb.push({Date: current, Revenue: revenue});
										
									}
									cnt = 1;
									current = $scope.cartPerformanceData[i].Date;
									
									revenue = parseFloat($scope.cartPerformanceData[i].CRevenue);
									
									
								} else {
									cnt++;
									revenue += parseFloat($scope.cartPerformanceData[i].CRevenue);
									
								}
							}
							if (cnt > 0) {
								$scope.cpb.push({Date: current, Revenue: revenue});
								
							}
						})();
						$scope.groupCartPerformance();
						$scope.getTotalCartRevenue();

						$scope.cartROI = ($scope.totalCartRevenue/$scope.totalCost)*100;
						var firstDate = new Date($filter('date')($scope.firstDay.value, 'MM-dd-yyyy'));
						var lastDate = new Date($filter('date')($scope.lastDay.value, 'MM-dd-yyyy'));
						var dupeDate = false;
						var triggered = false;
						var roiMatch = false;
						for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
							if($scope.cpb.length == 0){
								$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
							}
							if($scope.cpb.length > 0 && triggered === false){
								for(var e = 0; e < $scope.cpb.length; e++){
								    if($filter('date')(d, 'yyyy-MM-dd') == $scope.cpb[e].Date) {
								    	triggered = true;
								        $scope.filledCartDate.push({Date: $scope.cpb[e].Date, Revenue: $scope.cpb[e].Revenue});
								    }
								    else {
								    	for(var f = 0; f < $scope.filledCartDate.length; f++){
								    		if($scope.filledCartDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
								    			dupeDate = true;
								    		}
								    		else {
								    			dupeDate = false;
								    		}
								    	}
								    }
								}
							}
							if(dupeDate === false && $scope.cpb.length != 0 && triggered === false){					
								$scope.filledCartDate.push({Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
							}
							dupeDate = false;
							triggered = false;
						}
						
						for(var i = 0; i < $scope.filledCartDate.length; i++){
							for(var j = 0; j < $scope.filledDate.length; j++){
								if($scope.filledCartDate[i].Date == $scope.filledDate[j].Date){
									$scope.filledCartDate[i].ROI = ($scope.filledCartDate[i].Revenue/$scope.filledDate[j].Cost)*100;
								}
							}
						}
					})
			}).then(function(){
				jQuery('#loadingContainer').css('display', 'none');			
			});
			
			$scope.apd = [];
			$scope.apb = [];
			$scope.apb2 = [];
			$scope.app = [];
			$scope.apn = [];
			$scope.cpb = [];
			$scope.cpb2 = [];
			$scope.dailyCpd = [];
			$scope.apDevice = [];
	};

	$scope.searchPerformanceUpdate = function(){
		jQuery('#loadingContainer').css('display', 'block');
		var checkedProducts = [];
		var checkedNetworks = [];
		for(var i=0; i<$scope.productsList.length; i++){
			if($scope.productsList[i].Checked === true){
				checkedProducts.push($scope.productsList[i].ID);
			}
			
		}
		for(var j=0; j<$scope.networksList.length; j++){
			if($scope.networksList[j].Checked === true){
				checkedNetworks.push($scope.networksList[j].ID);
			}
		}

		var searchURL = "https://damp-river-98433.herokuapp.com/search_performance_update.php?brand="+$scope.selectedBrand.ID+"&product="+$scope.selectedProductsInBrand.type+"&network="+$scope.selectedNetwork.ID+"&device="+$scope.selectedDevice.Name;
		$http({
			method: 'POST',
			url: searchURL,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				"from" : $scope.firstDay.value,
				"to" : $scope.lastDay.value
			}
		})
			.then(function (response) {
				$scope.totalCost = 0;
				$scope.totalRevenue = 0;
				$scope.totalLeads = 0;
				$scope.filledDate = [];
				$scope.performanceData = response.data.records;
				var dupeDate = false;
				var triggered = false;
				for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
					if($scope.performanceData.length == 0){
						$scope.filledDate.push({BrandID: $scope.selectedBrand.ID, ProductID: $scope.selectedProductsInBrand.type, NetworkID: $scope.selectedNetwork.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0, Device: $scope.selectedDevice.Name});
					}
					if($scope.performanceData.length > 0 && triggered === false){
						for(var e = 0; e < $scope.performanceData.length; e++){
						    if($filter('date')(d, 'yyyy-MM-dd') == $scope.performanceData[e].Date) {
						    	triggered = true;
						        $scope.filledDate.push({ID: $scope.performanceData[e].ID, BrandID: $scope.performanceData[e].BrandID, ProductID: $scope.performanceData[e].ProductID, NetworkID: $scope.performanceData[e].NetworkID, Date: $scope.performanceData[e].Date, Cost: $scope.performanceData[e].Cost, Revenue: $scope.performanceData[e].Revenue, Leads: $scope.performanceData[e].Leads, Device: $scope.performanceData[e].Device});
						        $scope.totalCost += parseFloat($scope.performanceData[e].Cost);
						        $scope.totalRevenue += parseFloat($scope.performanceData[e].Revenue);
						        $scope.totalLeads += parseFloat($scope.performanceData[e].Leads);
						    }
						    else {
						    	for(var f = 0; f < $scope.filledDate.length; f++){
						    		if($scope.filledDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
						    			dupeDate = true;
						    		}
						    		else {
						    			dupeDate = false;
						    		}
						    	}
						    }
						}
						
					}
					if(dupeDate === false && $scope.performanceData.length != 0 && triggered === false){
						$scope.filledDate.push({BrandID: $scope.selectedBrand.ID, ProductID: $scope.selectedProductsInBrand.type, NetworkID: $scope.selectedNetwork.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Cost: 0, Revenue: 0, Leads: 0, Device: $scope.selectedDevice.Name});
					}
					dupeDate = false;
					triggered = false;
				}
			})
			.then(function(){
				$http({
					method: 'POST',
					url: "https://damp-river-98433.herokuapp.com/search_performance.php?brand="+$scope.selectedBrand.ID,
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						"from" : $scope.firstDay.value,
						"to" : $scope.lastDay.value
					}
				})
				.then(function(response){
					var totalBrandCost = response.data.records;
					
					//all performance data for brand cost
					(function () {
						var current = null;
						var cnt = 0;
						var cost = 0;
						var sorted = $filter('orderBy')(totalBrandCost, 'Date');
						$scope.sumBrandCost = 0;
						for (var i = 0; i < sorted.length; i++) {
							$scope.sumBrandCost += parseFloat(sorted[i].Cost);
							if (sorted[i].Date != current) {
								if (cnt > 0) {
									$scope.groupedBrandCost.push({Date: current, Cost: cost});
								}
								cnt = 1;
								current = sorted[i].Date;
								cost = parseFloat(sorted[i].Cost);
							} else {
								cnt++;
								cost += parseFloat(sorted[i].Cost);
							}
						}
						if (cnt > 0) {
							$scope.groupedBrandCost.push({Date: current, Cost: cost});
						}
					})();
				})
				.then(function(){
					$http({
						method: 'POST',
						url: "https://damp-river-98433.herokuapp.com/search_cart_performance.php?brand="+$scope.selectedBrand.ID,
						headers: {
							'Content-Type': 'application/json'
						},
						data: {
							"from" : $scope.firstDay.value,
							"to" : $scope.lastDay.value
						}
					})				
						.then(function (response) {
							$scope.filledCartDate = [];
							$scope.cartPerformanceData = response.data.records;					
							$scope.totalCartRevenue = 0;
							
							var dupeDate = false;
							var triggered = false;
							var roiMatch = false;
							for(var d = moment($scope.firstDay.value).toDate(); d.getTime() <= moment($scope.lastDay.value).toDate().getTime(); d.setDate(d.getDate()+1)) {
								if($scope.cartPerformanceData.length == 0){
									$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
								}
								if($scope.cartPerformanceData.length > 0 && triggered === false){
									for(var e = 0; e < $scope.cartPerformanceData.length; e++){
									    if($filter('date')(d, 'yyyy-MM-dd') == $scope.cartPerformanceData[e].Date) {
									    	triggered = true;
									        $scope.filledCartDate.push({ID: $scope.cartPerformanceData[e].ID, BrandID: $scope.cartPerformanceData[e].BrandID, Date: $scope.cartPerformanceData[e].Date, Revenue: $scope.cartPerformanceData[e].CRevenue});
									        $scope.totalCartRevenue += parseFloat($scope.cartPerformanceData[e].CRevenue);
									    }
									    else {
									    	for(var f = 0; f < $scope.filledCartDate.length; f++){
									    		if($scope.filledCartDate[f].Date == $filter('date')(d, 'yyyy-MM-dd')){
									    			dupeDate = true;
									    		}
									    		else {
									    			dupeDate = false;
									    		}
									    	}
									    }
									}
								}
								if(dupeDate === false && $scope.cartPerformanceData.length != 0 && triggered === false){					
									$scope.filledCartDate.push({BrandID: $scope.selectedBrand.ID, Date: $filter('date')(d, 'yyyy-MM-dd'), Revenue: 0});
								}
								dupeDate = false;
								triggered = false;
							}
							
							for(var i = 0; i < $scope.filledCartDate.length; i++){
								for(var j = 0; j < $scope.groupedBrandCost.length; j++){
									if($scope.filledCartDate[i].Date == $scope.groupedBrandCost[j].Date){
										$scope.filledCartDate[i].ROI = ($scope.filledCartDate[i].Revenue/$scope.groupedBrandCost[j].Cost)*100;
									}
								}
							}
							$scope.cartROI = ($scope.totalCartRevenue/$scope.sumBrandCost)*100;
						});
					$scope.getBrandName();
					$scope.getNetworkName();
					$scope.getProductName();
					$scope.getDeviceName();
				}).then(function(){
					jQuery('#loadingContainer').css('display', 'none');
				});
			})
		$scope.apd = [];
		$scope.cpd = [];
		$scope.cpb = [];
		$scope.dailyCpd = [];
		$scope.groupedBrandCost = [];
		$scope.filledBrandCost = [];
	};

	$scope.getNetwork = function(){
		$scope.networksList = [];
		$http.get("https://damp-river-98433.herokuapp.com/wsdl.php?method=all_network")
			.then(function (response) {
				$scope.networkData = response.data.records;
				$scope.selectedNetwork = {ID: $scope.networkData[0].ID};
				for(i=0; i<$scope.networkData.length; i++){
					$scope.networksList.push({ID: $scope.networkData[i].ID, Name: $scope.networkData[i].Name, Checked: true});
				}
			});
	};
	$scope.getProduct = function(){
		$scope.productsList = [];
		$scope.productsListInSearch = [];
		$http.get("https://damp-river-98433.herokuapp.com/wsdl.php?method=all_product")
			.then(function (response) {
				$scope.productData = response.data.records;
				$scope.selectedProduct = {ID: $scope.productData[0].ID};
				for(i=0; i<$scope.productData.length; i++){
					$scope.productsList.push({ID: $scope.productData[i].ID, BID: $scope.productData[i].BID,  Name: $scope.productData[i].Name, Checked: true});
					$scope.productsListInSearch.push({ID: $scope.productData[i].ID, BID: $scope.productData[i].BID,  Name: $scope.productData[i].Name, Checked: true});
				}
				
			});
	};
	$scope.getBrandName = function(){
		$http.get("https://damp-river-98433.herokuapp.com/search_brand.php?brand="+$scope.selectedBrand.ID)
			.then(function (response) {
				$scope.brandName = response.data.records[0].BrandName;
			})
	};
	$scope.getDeviceName = function(){
		$scope.deviceName = $scope.selectedDevice.Name
	};
	$scope.getProductName = function(){
		$http.get("https://damp-river-98433.herokuapp.com/search_product.php?product="+$scope.selectedProductsInBrand.type)
			.then(function (response) {
				$scope.productName = response.data.records[0].ProductName;
			})
	};
	$scope.getNetworkName = function(){
		$http.get("https://damp-river-98433.herokuapp.com/search_network.php?network="+$scope.selectedNetwork.ID)
			.then(function (response) {
				$scope.networkName = response.data.records[0].NetworkName;
			})
	};
	$scope.updateCart = function(ID, BrandID, Date, Revenue){
		if(Revenue.toString().match(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/)){
			$http({
				method: 'POST',
				url: "https://damp-river-98433.herokuapp.com/update_cart.php",
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					"ID" : ID,
					"BrandID" : BrandID,
					"Date" : Date,
					"Revenue" : Revenue
				}
			})
				.then(function (response){
					if(response.data == "Connection: success!Duplicate Performance"){
						$scope.messageFailure("Data already exists for this date, please update existing data for this date");
					} else {
						$scope.messageSuccess("Record Successfully Updated");
						$scope.searchPerformanceUpdate();
					}
				});
		}
		else {
			$scope.messageFailure("Invalid format");
		}
		
	};
	$scope.updatePerformanceCost = function(ID, BrandID, ProductID, NetworkID, Date, Cost, Device){
		if(Cost.toString().match(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/)){
			$http({
				method: 'POST',
				url: "https://damp-river-98433.herokuapp.com/update_performance.php?method=cost",
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					"ID" : ID,
					"BrandID" : BrandID,
					"ProductID" : ProductID,
					"NetworkID" : NetworkID,
					"Date" : Date,
					"Cost" : Cost,
					"Device" : Device
				}
			})
				.then(function (response){
					
					if(response.data == "Connection: success!Duplicate Performance"){
						$scope.messageFailure("Data already exists for this date, please update existing data for this date");
					} else {
						$scope.messageSuccess("Record Successfully Updated");
						$scope.searchPerformanceUpdate();
					}
				});
		}
		else{
			$scope.messageFailure("Invalid format");
		}
	};
	$scope.updatePerformanceRevenue = function(ID, BrandID, ProductID, NetworkID, Date, Revenue, Device){
		if(Revenue.toString().match(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/)){
			$http({
				method: 'POST',
				url: "https://damp-river-98433.herokuapp.com/update_performance.php?method=revenue",
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					"ID" : ID,
					"BrandID" : BrandID,
					"ProductID" : ProductID,
					"NetworkID" : NetworkID,
					"Date" : Date,
					"Revenue" : Revenue,
					"Device" : Device
				}
			})
				.then(function (response){
					if(response.data == "Connection: success!Duplicate Performance"){
						

						$scope.messageFailure("Data already exists for this date, please update existing data for this date");
					} else {
						
						$scope.messageSuccess("Record Successfully Updated");
						$scope.searchPerformanceUpdate();
					}
				});
		}
		else{
			$scope.messageFailure("Invalid format");
		}
	};
	$scope.updatePerformanceLeads = function(ID, BrandID, ProductID, NetworkID, Date, Leads, Device){
		if(Leads.toString().match(/^\d+$/)){
			$http({
				method: 'POST',
				url: "https://damp-river-98433.herokuapp.com/update_performance.php?method=leads",
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					"ID" : ID,
					"BrandID" : BrandID,
					"ProductID" : ProductID,
					"NetworkID" : NetworkID,
					"Date" : Date,
					"Leads" : Leads,
					"Device" : Device
				}
			})
				.then(function (response){
					if(response.data == "Connection: success!Duplicate Performance"){
						

						$scope.messageFailure("Data already exists for this date, please update existing data for this date");
					} else {
						

						$scope.messageSuccess("Record Successfully Updated");
						$scope.searchPerformanceUpdate();
					}
				});
		}
		else{
			$scope.messageFailure("Invalid format");
		}
	};

	$scope.deviceFilter = function (x) {
		return $scope.devices[x.Device];
	};
	$scope.networkFilter = function (x) {
		if($scope.networks){
			return $scope.networks[x.NetworkName];
		} else {
			return !$scope.networks[x.NetworkName];
			
		}
	};
	$scope.datePicker = function(){
		jQuery('.input-group.date').datepicker({
			format: "yyyy-mm-dd",
			autoclose: true
		});
	};
	$scope.messageSuccess = function(x){
		jQuery('.alert-success-div > p').html(x);
		jQuery('.alert-success-div').show();
		jQuery('.alert-success-div').delay(5000).slideUp(function(){
			jQuery('.alert-success-div > p').html('');
		});
	};
	$scope.messageFailure = function(x){
		jQuery('.alert-danger-div > p').html(x);
		jQuery('.alert-danger-div').show();
		jQuery('.alert-danger-div').delay(5000).slideUp(function(){
			jQuery('.alert-danger-div > p').html('');
		});
	};
}