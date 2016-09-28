angular.module("meanApp1", ["meanApp2"])
.controller("hotelListController", ["$scope", "mongooseData", function ($scope, mongooseData) {
    console.log("controller");
    $scope.meanTitle = "MEAN SPA HOTELS";
    mongooseData.hotelList().then(function (res) {
       /* console.log(res);*/
        $scope.data = res.data;
        
    });
}]);