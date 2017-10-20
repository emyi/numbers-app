angular.module('customFilters', [])
    .filter('dateRange', function(){
		return function( items, fromDate, toDate ) {
            var filtered = [];
            // console.log(fromDate, toDate);
            var from_date = Date.parse(fromDate);
            var to_date = Date.parse(toDate);

            angular.forEach(items, function(item) {

				var itemDate = new Date(item.Date.replace(/-/g, '/'));
  
                if(itemDate >= fromDate && itemDate <= toDate) {
                    filtered.push(item);
                    // console.log(itemDate.toDateString());
                    // console.log(fromDate.toDateString());
                    // console.log(item.Date);
                    // console.log('fromDate:'+fromDate);
                    // console.log('toDate:'+toDate);
                }
            });
            // console.log(filtered);
            return filtered;
        };
	})
	.filter('performanceNetwork', function(){
		return function( items, nid ){
			var filtered = [];
			// console.log('nid: '+nid);
			// console.log(items);
			angular.forEach(items, function(item) {

				// console.log('item.NetworkID: '+item.NetworkID);
				// console.log('item.NetworkID: '+typeof(item.NetworkID));
                // console.log('nid:'+ typeof(nid));
                // console.log(item);
                if(item.NetworkID == nid) {
					// console.log('hittingIf');
                    filtered.push(item);
                }
            });
            return filtered;
		};
	})
    .filter('groupBy', function ($timeout) {
        return function (data, key) {
            if (!key) return data;
            var outputPropertyName = '__groupBy__' + key;
            if(!data[outputPropertyName]){
                var result = {};  
                for (var i=0;i<data.length;i++) {
                    if (!result[data[i][key]])
                        result[data[i][key]]=[];
                    result[data[i][key]].push(data[i]);
                }
                Object.defineProperty(data, outputPropertyName, {enumerable:false, configurable:true, writable: false, value:result});
                $timeout(function(){delete data[outputPropertyName];},0,false);
            }
            return data[outputPropertyName];
        };
    });
