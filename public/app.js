angular.module("meanApp", ["ngRoute", "meanApp1", "meanApp2", "meanApp3", "angular-jwt"])
.config(function ($routeProvider) {
	$routeProvider
		.when("/hotels", {
			templateUrl: "hotel-list/hotels-list.html",
			controller: "hotelListController"
	   	})
		.when("/hotel/:hotelId", {
			templateUrl: "hotel-display/hotel-display.html",
			controller: "hotelDisplayController"
		})
		/*.when("/login", {
			templateUrl: "login/login.html",
			controller: "loginController"
		})*/
		.when("/register", {
			templateUrl: "register/register.html",
			controller: "registerController"
		})
})
