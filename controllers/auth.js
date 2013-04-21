// dependencies
var path = require("path")
  , passport = require(path.join("..", "lib", "passport"));

exports.twitter = function(req, res) {
	passport.authenticate('twitter');
};

exports.twitterCallback = function(req, res) {
	passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' });
};

exports.facebook = function(req, res) {
	passport.authenticate('facebook');
};

exports.facebookCallback = function(req, res) {
	passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });
};

exports.google = function(req, res) {
	passport.authenticate('google');
};

exports.googleCallback = function(req, res) {
	passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' });
};

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

};