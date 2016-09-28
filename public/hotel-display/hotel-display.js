angular.module("meanApp3", [])
.controller("hotelDisplayController", ["$scope", "$route", "$routeParams", "mongooseData", function ($scope, $route, $routeParams, mongooseData){
	
	var hotelId = $routeParams.hotelId;
	
	mongooseData.hotelDisplay(hotelId).then(function (res) {
		$scope.hotel = res.data
	});
	

	
}]);