var mongoose = require("mongoose");
var User = mongoose.model("Emp");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");



module.exports.register = function (req, res) {
	console.log("Registering user");
	var username = req.body.username;
	var name = req.body.name || null;
	var password = req.body.password;
	
	
	User.create({
		username: username,
		name: name,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		}, function (err, user) {
		
			if (err) {
				console.log(err);
				res
					.json(err)
			} else {
				console.log(user);
				res
					.json(user);
			};
	})	
};

module.exports.login = function (req, res) {
	console.log("logging in user");
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