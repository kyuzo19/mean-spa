angular.module("meanApp")
.controller("loginController", ["authStatus", "$http", "jwtHelper", "$window", "$location", function (authStatus, $http, jwtHelper, $window, $location){
	var lgn = this;
	
	lgn.isLoggedIn = function () {
		if (authStatus.authStatus) {
			return true;
		} else {
			return false;
		}
	}
	
	lgn.login = function(){
			console.log("login");
		var data = {
			username: lgn.username,
			password: lgn.password
		};
		
		$http.post("/api/users/login", data).then(function (res) {
			if (res.data.success) {
				authStatus.authStatus = true;
				$window.sessionStorage.token = res.data.token;
				var token = $window.sessionStorage.token;
				var decodedToken = jwtHelper.decodeToken(token);
				lgn.loggedInUser = decodedToken.username;
			}
		}).catch(function (err) {
			console.log(err);
		})
	};
	
	lgn.logout = function () {
		authStatus.authStatus = false;
		delete $window.sessionStorage.token;
		$location.path("/");
	}
	
	
}])