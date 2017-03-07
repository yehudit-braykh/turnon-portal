clixApp.factory("knetikFactory", function($http, $location, $rootScope, User, $q, $interval, User) {
    var scope = {};

    scope.getPoints = function(){
		var deffered = $q.defer();
		$http({method: 'GET', url: '/api/knetik/get_balance'}).
		success(function(data, status, headers, config) {
		//	console.log("get points success", data);
			deffered.resolve(data);

		}).
		error(function(data, status, headers, config) {
		//	console.log("get points error", data);
		});

		return deffered.promise;
	}

    scope.getCataloge = function(){
		var deffered = $q.defer();
		$http({method: 'GET', url: '/api/knetik/get_catalog'}).
		success(function(data, status, headers, config) {
		//	console.log("get points success", data);
			deffered.resolve(data);

		}).
		error(function(data, status, headers, config) {
		//	console.log("get points error", data);
		});

		return deffered.promise;
	}

	scope.updateActivity = function(item, type){
		//console.log('updateActivity call', item,type);
		var deffered = $q.defer();
		$http({method: 'POST', url: '/api/knetik/save_activity', data:{item_id: item, type: type} }).
		success(function(data, status, headers, config) {
		//	console.log("get points success", data);
			deffered.resolve(data);
			$rootScope.$broadcast("points-update");

		}).
		error(function(data, status, headers, config) {
		//	console.log("get points error", data);
		});

		return deffered.promise;
	}

    scope.redeemCard = function(card, points) {
    //    console.log('redeem Card',card, points);
        var deffered = $q.defer();
		$http({method: 'POST', url: '/api/knetik/redeem_card', data:{card: card, points: points} }).
		success(function(data, status, headers, config) {
		//	console.log("get points success", data);
			deffered.resolve(data);
			$rootScope.$broadcast("points-update");

		}).
		error(function(data, status, headers, config) {
		//	console.log("get points error", data);
		});

		return deffered.promise;
    }

    return scope;

});
