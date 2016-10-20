angular.module("meanApp")
.factory("authStatus", function () {
	var auth = {};
	auth.authStatus = false;
	return auth;
})