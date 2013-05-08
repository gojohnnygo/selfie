// dependencies
var path = require("path")
  , passport = require("passport")
  , StrategyInstagram = require("passport-instagram").Strategy
  , StrategyTwitter = require("passport-twitter").Strategy
  , StrategyFacebook = require("passport-facebook").Strategy
  , StrategyGoogle = require("passport-google").Strategy
  , ModelUser = require(path.join("..", "models", "user"));

passport.serializeUser(function(user, done) {
    console.log("Passport serialize");
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    ModelUser.findById(id, function(err, user) {
        console.log("Passport deserilzie " + user);
        done(err, user);
    });
});

// instagram
passport.use(new StrategyInstagram({
    clientID: "986a385c073d4f0daa3822fa76448b16",
    clientSecret: "eae4d2845ea8453e87e3a123caad81a6",
    callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
},
    function(accessToken, refreshToken, profile, done) {
        ModelUser.findOrCreate({ auth: profile.provider + "-" + profile.id }, { creds: 50 }, function (err, user) {
            console.log("Passport findOrCreate");
            // udpate user token
            user.token = accessToken;
            user.save(function(err) {
                if (err) console.log("Access Token Error: " + err);
            });
            return done(err, user);
        });
    }
));

// twitter
passport.use(new StrategyTwitter({
    consumerKey: "sXywYTY8B8ci7Wpv4xIuzQ",
    consumerSecret: "vIhrQUiPCBDTQWIWndFIco8yIS83Tl1b4orm8MwEdQ",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
    function(token, tokenSecret, profile, done) {
        ModelUser.findOrCreate({ auth: profile.provider + "-" + profile.id }, function(err, user) {
            if (err) { return done(err); }
      	    done(null, user);
        });
    }
));

// facebook
passport.use(new StrategyFacebook({
    clientID: '125689007622711',
    clientSecret: 'd74771ca1bfb60968019d816b2974bb4',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
},
    function(accessToken, refreshToken, profile, done) {
        ModelUser.findOrCreate({auth: profile.provider + "-" + profile.id}, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

// google
passport.use(new StrategyGoogle({
    returnURL: 'http://www.example.com/auth/google/return',
    realm: 'http://www.example.com/'
},
    function(identifier, profile, done) {
        ModelUser.findOrCreate({ openId: identifier }, function(err, user) {
            done(err, user);
        });
    }
));

module.exports = passport;