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
                    .json(err)
            } else {
                res
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
            res 
                .json(hotel)
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
                console.log(err);
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
