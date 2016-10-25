angular.module("meanApp")
.controller("registerController", ["$scope","registerService", "$http", function ($scope, registerService, $http){
		
	
	$scope.register = function () {
		var data = {
				username: $scope.username,
				name: $scope.name,
				password: $scope.password
			};
		
		if (!$scope.password || !$scope.passwordConfirm) {
			$scope.errorMessage = "please supply password";
		} else {
			if ($scope.password !== $scope.passwordConfirm) {
				$scope.errorMessage = "Password mismatch"
			} else {
			
				$http.post("/api/users/register", data).then(function(){
					console.log("register successful");
			        $scope.alertMessage = "Registration successful";
					$scope.errorMessage = "";
				}).catch(function (err) {
					console.log(err);
                    
				})
			}	
		};
		
		 
		
		
	};
}])