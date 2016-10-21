angular.module("meanApp")
.controller("registerController", ["$scope","registerService", function ($scope, registerService){
		
	
	$scope.register = function () {
		var data = {
				username: $scope.username,
				name: $scope.name,
				password: $scope.password
			};
		
		if (!$scope.password || !$scope.passwordConfirm) {
			console.log("please supply password");
		} else {
			if ($scope.password !== $scope.passwordConfirm) {
			console.log("Password mismatch");
			} else {
			
				registerService.reg(data).then(function(){
					console.log("register successful");
			
				}).catch(function (err) {
					console.log(err);
				})
			}	
		};
		
		 
		
		
	};
}])