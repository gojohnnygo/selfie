// dependencies
var path = require("path")
  , passport = require(path.join("..", "lib", "passport"));

exports.twitter = passport.authenticate("twitter");

exports.twitterCallback = passport.authenticate("twitter", { successRedirect: '/success', failureRedirect: '/login' });

exports.facebook = passport.authenticate("facebook");

exports.facebookCallback = passport.authenticate("facebook", { successRedirect: '/', failureRedirect: '/login' });

exports.google = passport.authenticate("google");

exports.googleCallback = passport.authenticate("google", { successRedirect: '/', failureRedirect: '/login' });

exports.login = function(req, res) {
	req.login(user, function(err) {
  		if (err) { return next(err); }
  		return res.redirect('/users/' + req.user.username);
  	});
};

exports.logout = function(req, res) {
	req.logout();
  	res.redirect('/');
};

exports.success = function(req, res) {
	console.log("success");
	res.redirect("/");
};