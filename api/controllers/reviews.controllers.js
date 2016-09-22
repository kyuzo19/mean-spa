var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

module.exports.reviewsGetAll = function (req, res) {
	var hotelId = req.params.hotelId;
    
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, reviews) {
            res
                .json(reviews)
        })
};

module.exports.reviewsGetOne = function (req, res) {
	var hotelId = req.params.hotelId;
    var  reviewId = req.params.reviewId;
    
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, hotel) {
            res 
                .json(hotel.reviews.id(reviewId));
        })
};

module.exports.reviewPost = function (req, res) {
	var hotelId = req.params.hotelId;
	
	Hotel
		.findById(hotelId)
		.select("reviews")
		.exec(function (err, hotelreview) {
			if (err) {
				res
					.json(err)
			} else {
				hotelreview.reviews.push({
					name: req.body.name,
					rating: parseInt(req.body.rating, 10),
					review: req.body.review
				});
				
				hotelreview.save(function (err, reviewUpdate) {
					res
						.json(reviewUpdate.reviews[reviewUpdate.reviews - 1])
				});
			};
			
		})
};

module.exports.reviewUpdate = function (req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("hotel id " + hotelId + "review id " + reviewId);
	Hotel
		.findById(hotelId)
		.select("reviews")
		.exec(function (err, reviews) {
			console.log(reviews);
			review1 = reviews.reviews.id(reviewId)
			review1.name = req.body.name;
			review1.rating = req.body.rating;
			review1.review = req.body.review;
			
			reviews.save(function (err, reviewUpdate) {
				res
					.json(reviewUpdate);
			});
		})
};
