angular.module("meanApp")
.controller("registerController", ["$scope","registerService", function ($scope, registerService){
	
	
	$scope.register = function () {
		console.log("registering user");
		var data = {
			username: $scope.username,
			name: $scope.name,
			password: $scope.password
		};
		
		registerService.reg(data).then(function(){
			console.log("register successful");
			
		})
		
	};
}])