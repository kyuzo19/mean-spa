angular.module("meanApp3", [])
.controller("hotelDisplayController", ["$scope", "$route", "$routeParams", "mongooseData", function ($scope, $route, $routeParams, mongooseData){
	
	var hotelId = $routeParams.hotelId;
	
	mongooseData.hotelDisplay(hotelId).then(function (res) {
		$scope.hotel = res.data
	});
	
	
	$scope.submitReview = function () {
		var review = {
			name: $scope.name,
			review: $scope.review,
			rating: $scope.rating
		};
		
		mongooseData.hotelReview(hotelId, review).then(function(){
			console.log("add review success");
			$route.reload();
		})
	};

	
}]);