/**
 * App dependencies
 */
var express = require('express')
  , app = module.exports = express()
  , passport = require('passport')
  , StrategyTwitter = require('passport-twitter').Strategy
  , StrategyFacebook = require('passport-facebook').Strategy
  , StrategyGoogle = require('passport-google').Strategy;

var User = module.parent.exports.user;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Twitter auth
 */
passport.use(new StrategyTwitter({
    consumerKey: 'sXywYTY8B8ci7Wpv4xIuzQ',
    consumerSecret: 'vIhrQUiPCBDTQWIWndFIco8yIS83Tl1b4orm8MwEdQ',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({provider: profile.provider}, {id: profile.id}, function(err, user) {
    	if (err) { return done(err); }
      	done(null, user);
    });
  }
));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/twittersuccess', failureRedirect: '/login' }));

app.get('/auth/twitter', function(req, res) {
  res.send("req.user");
});

app.get('/login', function(req, res) {
	res.send("sadness")
});

app.get('/twittersuccess', function(req, res) {
	res.send("yay")
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
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