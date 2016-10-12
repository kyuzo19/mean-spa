var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

var _splitArray = function(input) {
  var output;
  if ( input.length > 1) {
    output = input.split(";");
  } else {
    output = input
  }
  return output;
};

module.exports.hotelsGetAll = function (req, res) {
	console.log("Retrieving list of Hotels");
    Hotel
        .find()
        .exec(function (err, hotels) {
            if(err) {
                res
					.status(400)
                    .json(err)
            } else {
                res
					.status(200)
                    .json(hotels)
            }
            })
};

module.exports.hotelsGetOne = function (req, res) {
	console.log("Retrieving one hotel");
    var hoteldId = req.params.hotelId;  
    Hotel   
        .findById(hoteldId)
        .exec(function (err, hotel) {
			var response = {
				status : 200,
				message : hotel
			};
			if (err) {
				response.status = 500;
				response.message = err		
			} else if (!hotel){
				response.status = 404;
				response.message = "hotel not found " + hoteldId
			}	
			res
				.status(response.status)
				.json(response.message)
            
        });
};

module.exports.hotelsAddOne = function (req, res) {
    
    Hotel   
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function (err, hotel) {
            if (err) {
                res
					.status(400)
					.json(err)
            } else {
                res 
                    .status(201)
                    .json(hotel)
            }
        });
};

module.exports.hotelsUpdateOne = function (req, res) {
    var hotelId = req.params.hotelId;
	
	Hotel
		.findById(hotelId)
		.select("-reviews -rooms")//excluding this parameter
		.exec(function (err, hotel) {
			hotel.name = req.body.name;
			hotel.description = req.body.description;
			hotel.stars = req.body.stars;
			hotel.services = _splitArray(req.body.services);
			hotel.photos = _splitArray(req.body.photos);
			hotel.currency = req.body.currency;
			hotel.location = {
				address : req.body.address,
				coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
			};
			
			hotel.save(function (err, hotelUpdate) {
				res
					.json(hotelUpdate)
			});
			
		})
};

module.exports.deleteHotel = function (req, res) {
	var hotelId = req.params.hotelId;
	
	Hotel 
		.findByIdAndRemove(hotelId)
		.exec(function (err, hotel){
			if (err) {
				res
					.status(500)
					.json(err)
			} else {
				res
					.status(200)
					.json(hotel)
			}
		})
};
