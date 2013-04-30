// dependencies
var path = require("path")
  , https = require("https")
  , mongo = require(path.join("..", "lib", "mongo"))
  , mongoose = mongo.mongoose
  , User = require(path.join("..", "models", "user"));

var ENDPOINT = "api.instagram.com";
var PATH = "/v1/users/";

function getCleanId(auth) {
	return auth.split("-")[1];
}

exports.getInfo = function(req, res) {
    User.findOne({ _id: req.cookies.id }, function (err, docs) {
        if (err) res.json(err);

        var options = {
	    	host: ENDPOINT,
	    	path: PATH + getCleanId(docs.auth) + "/?access_token=" + docs.token
	    }

	    var callback = function(response) {
			response.on("data", function(data) {
				res.render("profile", { info: data });
			});

			response.on("error", function(err) {
				console.log(err);
			});
		};

		https.get(options, callback);
    });
}

exports.getPhotos = function(req, res) {
    User.findOne({ _id: req.user }, function (err, docs) {
        if (err) res.json(err);

        var options = {
	    	host: ENDPOINT,
	    	path: PATH + getCleanId(docs.auth) + "/media/recent/?access_token=" + docs.token
	    }

	    var callback = function(response) {
			var chunk = "";
			response.on("data", function(data) {
				chunk += data;
			});

			response.on("error", function(err) {
				console.log(err);
			});

			response.on("end", function() {
				// res.send(chunk)
				console.log(chunk);
				res.render("instagram", { media: chunk });
			});

			response.on("close", function() {
				console.log("close");
			});

			response.on("finish", function() {
				console.log("finish")
			})
		};

		https.get(options, callback);
    });
}


// https.get('https://encrypted.google.com/', function(res) {
//   console.log("statusCode: ", res.statusCode);
//   console.log("headers: ", res.headers);

//   res.on('data', function(d) {
//     process.stdout.write(d);
//   });

// }).on('error', function(e) {
//   console.error(e);
// });