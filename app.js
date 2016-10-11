
//connect to mlab database
require("./api/data/db.js");
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./api/routes");

//setting port to use
app.set("port", 3000);

//middleware console log every request
app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

//static directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/fonts", express.static(__dirname + "/fonts"));

//enable parsing of posted forms
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//add some routing
app.use("/api", routes);

//listen for request
var server = app.listen(app.get("port"), function () {
	var port = server.address().port;
	console.log("Connection at port " + port);
});