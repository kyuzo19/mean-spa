var express = require("express");
var router = express.Router();

var ctrlHotels = require("../controllers/hotels.controllers.js");
var ctrlReviews = require("../controllers/reviews.controllers.js");
var ctrlUsers = require("../controllers/users.controllers.js")

router
	.route("/hotels")
	.get(ctrlHotels.hotelsGetAll)
    .post(ctrlUsers.authenticate,ctrlHotels.hotelsAddOne)

router
	.route("/hotels/:hotelId")
	.get(ctrlHotels.hotelsGetOne)
    .put(ctrlUsers.authenticate,ctrlHotels.hotelsUpdateOne)
	.delete(ctrlUsers.authenticate,ctrlHotels.deleteHotel)

router
	.route("/hotels/:hotelId/reviews")
	.get(ctrlReviews.reviewsGetAll)
	.post(ctrlUsers.authenticate,ctrlReviews.reviewPost)

router
	.route("/hotels/:hotelId/reviews/:reviewId")
	.get(ctrlReviews.reviewsGetOne)
	.put(ctrlUsers.authenticate,ctrlReviews.reviewUpdate)
	.delete(ctrlUsers.authenticate,ctrlReviews.reviewDelete)

router
	.route("/users/register")
	.post(ctrlUsers.register)
	
router
	.route("/users/login")
	.post(ctrlUsers.login)

module.exports = router;