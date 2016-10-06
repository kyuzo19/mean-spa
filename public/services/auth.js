angular.module("meanApp")
.factory("registerService", ["$http", function ($http){
	var data = {};
	data.reg = function (data) {
		return $http.post("/api/users/register", data).then(function(res){
			return res;
		}).catch(function(err){
			console.log(err);
		})
	};
	data.login = function (data) {
		return $http.post("/api/users/login",data).then(function(res){
			return res;
		})
	}
	return data;
}])