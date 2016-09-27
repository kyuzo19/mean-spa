angular.module("meanApp", ["ngRoute"])
.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "hotel/hotels.html",
			controller: mainController
	})
})
