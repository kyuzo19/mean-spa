var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

module.exports.reviewsGetAll = function (req, res) {
	var hotelId = req.params.hotelId;
    
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, reviews) {
			var response = {
				status : 200,
				data : reviews
			};
			if (err) {
				response.status = 500;
				response.data = err;
			} else if (!reviews) {
				response.status = 404;
				response.data = {
					message : "Hotel not found"
				}
			}
            res
				.status(response.status)
				.json(response.data)
        })
};

module.exports.reviewsGetOne = function (req, res) {
	var hotelId = req.params.hotelId;
    var  reviewId = req.params.reviewId;
    
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, hotel) {
			if (err) {
				res
					.status(500)
					.json(err)
			} else {
				res 
					.status(200)
					.json(hotel.reviews.id(reviewId));
			}
            
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
					.status(500)
					.json(err)
			} else {
				hotelreview.reviews.push({
					name: req.body.name,
					rating: parseInt(req.body.rating, 10),
					review: req.body.review
				});
				
				hotelreview.save(function (err, reviewUpdate) {
					if (err) {
						res
							.status(500)
							.json(err)
					} else {
						res
							.status(201)
							.json(reviewUpdate.reviews[reviewUpdate.reviews.length - 1])
					}
					
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

module.exports.reviewDelete = function (req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	
	Hotel
		.findById(hotelId)
		.select("reviews")
		.exec(function (err, data) {
			if (err) {
				res
					.status(500)
					.json(err)
			} else {
				
				data.reviews.id(reviewId).remove();
				data.save(function (err, data) {
					if(err) {
						res
							.status(500)
							.json(err)
					} else {
						res
							.status(200)
							.json(data)
					}
					
				})
				
			}
		})
};