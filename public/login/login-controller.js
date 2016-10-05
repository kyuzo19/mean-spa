angular.module("meanApp")
.controller("loginController", ["$scope",function ($scope){
	
	$scope.login = function(){
		console.log("logging in");	
	};
}])