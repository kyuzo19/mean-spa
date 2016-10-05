angular.module("meanApp", ["ngRoute", "meanApp1", "meanApp2", "meanApp3"])
.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "hotel-list/hotels-list.html",
			controller: "hotelListController"
	   	})
		.when("/hotel/:hotelId", {
			templateUrl: "hotel-display/hotel-display.html",
			controller: "hotelDisplayController"
		})
		.when("/login", {
			templateUrl: "login/login.html",
			controller: "loginController"
		})
})
