var mongoose = require("mongoose");
var dburl = "mongodb://localhost:27017/meanhotel";

 var retry = null;
mongoose.connect(dburl);

//connection events
mongoose.connection.on("connected", function () {
	console.log("Mongoose connected to " + dburl);
});
mongoose.connection.on("error", function (err) {
	console.log("Mongoose connection error " + err);
});
mongoose.connection.on("disconnected", function () {
	console.log("Mongoose disconnected");
});

//capture app termination

function gracefullShutdown (msg, callback) {
	mongoose.connection.close(function () {
		console.log("Mongoose disconnected through " + msg);
		callback();	
	});
};

//nodemon restarts
process.once("SIGUSR2", function () {
	gracefullShutdown("nodemon restarts", function () {
		process.kill(process.pid, "SIGUSR2");
	});
});

//for app termination
process.on("SIGNIT", function () {
	gracefullShutdown("App termination", function () {
		process.exit(0);
	});
});

//for heroku app termination
process.on("SIGTERM", function () {
	gracefullShutdown("App termination (SIGTERM)", function () {
		process.exit(0);
	});
});

//schema
require("./hotels.model");
