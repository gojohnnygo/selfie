/**
 * App dependencies
 */
var express = require('express')
  , app = module.exports = express()
  , passport_twitter = require('passport')
  , passport_facebook = require('passport')
  , passport_google = require('passport')
  , StrategyTwitter = require('passport-twitter').Strategy
  , StrategyFacebook = require('passport-facebook').Strategy
  , StrategyGoogle = require('passport-google').Strategy;

var User = module.exports.user;

/**
 * Twitter auth
 */
app.use(passport_twitter.initialize());
app.use(passport_twitter.session());

passport_twitter.use(new StrategyTwitter({
    consumerKey: 'sXywYTY8B8ci7Wpv4xIuzQ',
    consumerSecret: 'vIhrQUiPCBDTQWIWndFIco8yIS83Tl1b4orm8MwEdQ',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({provider: profile.provider}, {id: profile.id}, function(err, user) {
    	if (err) { return done(err); }
      	done(null, 0);
    });
  }
));

app.get('/auth/twitter', passport_twitter.authenticate('twitter'));
app.get('/auth/twitter/callback', passport_twitter.authenticate('twitter', { successRedirect: '/twittersuccess', failureRedirect: '/login' }));

app.get('/auth/twitter', function(req, res) {
  res.send("req.user");
});

/**
 * Facebook auth
 */
// app.use(passport_facebook.initialize());
// app.use(passport_facebook.session());

// passport_facebook.use(new FacebookStrategy({
//     clientID: '125689007622711',
//     clientSecret: 'd74771ca1bfb60968019d816b2974bb4',
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

// passport_google.use(new GoogleStrategy({
//     returnURL: 'http://www.example.com/auth/google/return',
//     realm: 'http://www.example.com/'
//   },
//   function(identifier, profile, done) {
//     User.findOrCreate({ openId: identifier }, function(err, user) {
//       done(err, user);
//     });
//   }
// ));

// app.get('/auth/facebook', passport.authenticate('facebook'));

/**
 * Google auth
 */
// app.get('/auth/twitter/callback', 
//   passport.authenticate('twitter', { successRedirect: '/',
//                                      failureRedirect: '/login' }));

// app.get('/auth/facebook/callback', 
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));

// app.use(passport_google.initialize());
// app.use(passport_google.session());

// app.get('/auth/google/return', 
//   passport.authenticate('google', { successRedirect: '/',
//                                     failureRedirect: '/login' }));

// app.get('/auth/google', passport.authenticate('google'));