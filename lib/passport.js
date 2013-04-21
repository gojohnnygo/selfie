// dependencies
var path = require("path")
  , passport = require("passport")
  , StrategyTwitter = require("passport-twitter").Strategy
  , StrategyFacebook = require("passport-facebook").Strategy
  , StrategyGoogle = require("passport-google").Strategy
  , ModelUser = require(path.join("..", "models", "user"));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    ModelUser.findById(id, function(err, user) {
        done(err, user);
    });
});

// twitter
passport.use(new StrategyTwitter({
    consumerKey: "sXywYTY8B8ci7Wpv4xIuzQ",
    consumerSecret: "vIhrQUiPCBDTQWIWndFIco8yIS83Tl1b4orm8MwEdQ",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
    function(token, tokenSecret, profile, done) {
        ModelUser.findOrCreate({provider: profile.provider}, {id: profile.id}, function(err, user) {
    	    if (err) { return done(err); }
      	    done(null, user);
        });
    }
));

// facebook
// passport_facebook.use(new FacebookStrategy({
//     clientID: '125689007622711',
//     clientSecret: 'd74771ca1bfb60968019d816b2974bb4',
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
//     function(accessToken, refreshToken, profile, done) {
//         ModelUser.findOrCreate(..., function(err, user) {
//             if (err) { return done(err); }
//             done(null, user);
//         });
//     }
// ));

// google
// passport_google.use(new GoogleStrategy({
//     returnURL: 'http://www.example.com/auth/google/return',
//     realm: 'http://www.example.com/'
// },
//     function(identifier, profile, done) {
//         ModelUser.findOrCreate({ openId: identifier }, function(err, user) {
//             done(err, user);
//         });
//     }
// ));

module.exports = passport;