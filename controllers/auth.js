// dependencies
var path = require("path")
  , passport = require(path.join("..", "lib", "passport"));

var routes = { successRedirect: '/', failureRedirect: '/login' }

exports.instagram = passport.authenticate("instagram");
exports.instagramCallback = passport.authenticate("instagram", routes);

exports.twitter = passport.authenticate("twitter");
exports.twitterCallback = passport.authenticate("twitter", routes);

exports.facebook = passport.authenticate("facebook");
exports.facebookCallback = passport.authenticate("facebook", routes);

exports.google = passport.authenticate("google");
exports.googleCallback = passport.authenticate("google", routes);

exports.login = function(req, res) {
	req.login(user, function(err) {
  		if (err) { return next(err); }
  		return res.redirect('/users/' + req.user.handle);
  	});
};

exports.logout = function(req, res) {
	req.logout();
  	res.redirect('/');
};