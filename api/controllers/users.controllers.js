var mongoose = require("mongoose");
var User = mongoose.model("Users");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");



module.exports.register = function (req, res) {
	var username = req.body.username;
	var name = req.body.name || null;
	var password = req.body.password;

	User.create({
		username: username,
		name: name,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		}, function (err, user) {
			if (err) {
				res
					.status(500)
					.json(err)
			} else {
				res
					.status(201)
					.json(user);
			};
	})	
};

module.exports.login = function (req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	User
		.findOne({username:username})
		.exec(function (err, user) {
			if(err) {
				res
					.status(400)
					.json(err)
			} else {
				if(bcrypt.compareSync(password, user.password)) {
					console.log("user found");
					var token = jwt.sign({username: user.username}, "s3cr3t",{expiresIn: 3600});
					
					res
						.status(200)
						.json({
							success : true, 
							token : token})
					} else {
						res
							.status(401)
							.json("Unauthorized")
					}
			}
		})
};

module.exports.authenticate = function (req, res, next) {
	
	if (req.headers.authorization) {
		var token = req.headers.authorization.split(" ")[1]; //Authorization Bearer xxx
		jwt.verify(token, "s3cr3t", function (err, decoded) {
			if (err) {
				res
					.status(401)
					.json("unauthorized")
			} else {
				req.user = decoded.username;
				next()
			}
		})
 	} else {
		res
			.status(403)
			.json("No token Provided")
	}

	
	
};