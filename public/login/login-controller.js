angular.module("meanApp")
.controller("loginController", ["$scope", "registerService", function ($scope, registerService){
	
	$scope.login = function(){
		var data = {
			username: $scope.username,
			password: $scope.password
		};
		
		registerService.login(data).then(function(res){
			console.log(res);
		})
	};
}])