// dependencies
var path = require("path")
  , auth = require(path.join(__dirname, "controllers", "auth"))
  , controllerUser = require(path.join(__dirname, "controllers", "user"))
  , controllerPhoto = require(path.join(__dirname, "controllers", "photo"));

module.exports = function(app) {
    // auth
    app.get("/auth/twitter", auth.twitter);
    app.get("/auth/twitter/callback", auth.twitterCallback);

    app.get("/auth/facebook", auth.facebook);
    app.get("/auth/facebook/callback", auth.facebookCallback);

    app.get("/auth/google", auth.google);
    app.get("/auth/google/callback", auth.googleCallback);

    app.get("/login", auth.login);
    app.get("/logout", auth.logout);
    app.get("/success", auth.success);

    // // user
    app.get("/users", controllerUser.getAll);
    app.get("/user/:uid", controllerUser.getUser);
    app.get("/user/:uid/photos", controllerUser.getPhotos);
    app.get("/user/:uid/photo/:pid", controllerUser.getPhoto);
    app.get("/user/:uid/likes", controllerUser.getLikes);
    app.get("/user/:uid/following", controllerUser.getFollowing);
    app.get("/user/:uid/followers", controllerUser.getFollowers);

    app.post("/user", controllerUser.createUser);
    app.post("/user/:uid/photo", controllerUser.uploadPhoto);

    app.put("/user/:uid", controllerUser.editUser);

    app.delete("/user/:uid", controllerUser.deleteUser);
    app.delete("/user/:uid/photo/:pid", controllerUser.deletePhoto);

    // // photo
    app.get("/photos", controllerPhoto.getAll);
    app.get("/photos/geo/:gid", controllerPhoto.getGeo);
    app.get("/photos/leaderboard", controllerPhoto.getLeaderboard);

    app.put("/photo/:pid/like", controllerPhoto.likePhoto);
    app.put("/photo/:pid/unlike", controllerPhoto.unlikePhoto);

    // catch all
    app.get("*", function(req, res) {
        console.log("What are you doing?")
    });
}