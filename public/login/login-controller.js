angular.module("meanApp")
.controller("loginController", ["$scope", "registerService", function ($scope, registerService){
	
	$scope.login = function(){
			var usrnme = $scope.username;
			var psswrd = $scope.password;
		
		console.log(usrnme);
		console.log(psswrd);
		
		var data = {
			username: $scope.username,
			password: $scope.password
		};
		
		/*registerService.login(data).then(function(res){
			console.log(res);
		}).catch(function(err) {
			console.log(err);
		})*/
	};
}])