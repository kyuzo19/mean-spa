angular.module("meanApp2", [])
.factory("mongooseData", function ($http) {
    var db = {};
    
    function response (res) {
        console.log(res);
        return res;
    };
    
    function err (err) {
        console.log(err);
    };
    
    db.hotelList = function () {
        return $http.get("/api/hotels").then(response).catch(err)
    };
    
    db.hotelDisplay = function (id) {
        return $http.get("/api/hotels/" + id).then(response).catch(err)
    };
    
    db.hotelReview = function (id, review) {
        return $http.post("/api/hotels/" + id + "/reviews/",review).then(response).catch(err);
    };
    
    return db;
})