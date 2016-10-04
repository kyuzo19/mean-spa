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
	
};