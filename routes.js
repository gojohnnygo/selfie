// dependencies
var path = require("path")
  , auth = require(path.join(__dirname, "controllers", "auth"))
  , controllerUser = require(path.join(__dirname, "controllers", "user"))
  , controllerPhoto = require(path.join(__dirname, "controllers", "photo"))
  , controllerInstagram = require(path.join(__dirname, "controllers", "instagram"))
  , User = require(path.join(__dirname, "models", "user"))
  , Photo = require(path.join(__dirname, "models", "photo"))
  , mongo = require(path.join(__dirname, "lib", "mongo"))
  , mongoose = mongo.mongoose
  , ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function(app) {
    // auth
    app.get("/auth/instagram", auth.instagram);
    app.get("/auth/instagram/callback", auth.instagramCallback);

    app.get("/auth/twitter", auth.twitter);
    app.get("/auth/twitter/callback", auth.twitterCallback);

    app.get("/auth/facebook", auth.facebook);
    app.get("/auth/facebook/callback", auth.facebookCallback);

    app.get("/auth/google", auth.google);
    app.get("/auth/google/callback", auth.googleCallback);

    app.get("/login", auth.login);
    app.get("/logout", auth.logout);

    // instagram
    app.get("/instagram/info", controllerInstagram.getInfo);
    app.get("/instagram/photos", controllerInstagram.getPhotos);

    // user
    app.get("/users", controllerUser.getAll);
    app.get("/user/:uid", controllerUser.getUser);
    app.get("/user/:uid/photos", controllerUser.getPhotos);
    app.get("/user/:uid/likes", controllerUser.getLikes);
    app.get("/user/:uid/following", controllerUser.getFollowing);
    app.get("/user/:uid/followers", controllerUser.getFollowers);

    app.get("/user/:uid/instagram", controllerInstagram.getPhotos);

    app.post("/user/:uid/photo", controllerUser.uploadPhoto);
    app.post("/user/:uid/credits", controllerUser.addCredits);

    app.put("/user/:uid", controllerUser.editUser);

    app.delete("/user/:uid", controllerUser.deleteUser);
    app.delete("/user/:uid/photo/:pid", controllerUser.deletePhoto);

    // photo
    app.get("/photos", controllerPhoto.getAll);
    app.get("/photos/geo/:gid", controllerPhoto.getGeo);
    app.get("/photos/leaderboard", controllerPhoto.getLeaderboard);

    app.put("/photo/:pid/like", controllerPhoto.likePhoto);
    app.put("/photo/:pid/unlike", controllerPhoto.unlikePhoto);

    // temp photo upload
    app.get('/', function(req, res) {
        if (req.user) {
            res.cookie("id", (req.user).toString());
            res.redirect("/user/" + req.user);
        }

        res.render("index");

        // var id = req.cookies.id;
        // var message = [
        //     "<html>",
        //     "<head>",
        //     "<title>Upload Example</title>",
        //     "</head>",
        //     "<body>",
        //     "<ul>",
        //     "<li><a href='/users'>Get All Users</a></li>",
        //     "<li><a href='/user/" + id + "'>Get User</a></li>",
        //     "<li><a href='/user/" + id + "/photos'>Get All User Photos</a></li>",
        //     "<li><a href='/user/" + id + "/likes'>Get User Likes</a></li>",
        //     "<li><a href='/user/" + id + "/following'>Get User Following</a></li>",
        //     "<li><a href='/user/" + id + "/followers'>Get User Followers</a></li>",
        //     "</ul>",
        //     "<form id='uploadForm'",
        //     "enctype='multipart/form-data'",
        //     "action='/user/" + id + "/photo'",
        //     "method='post'>",
        //     "<input type='file' id='userPhotoInput' name='userPhoto' />",
        //     "</form>",
        //     "<span id='status' />",
        //     "<img id='uploadedImage' />",
        //     "<script src='//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>",
        //     "<script src='/javascripts/jquery.form.js'></script>",
        //     "<script src='/javascripts/upload.js'></script>",
        //     "</body>",
        //     "</html>"
        // ].join('\n');
    });


    // test increment
    app.get('/inc', function(req, res) {
        console.log("user")
        console.log(req.user);
        User.findOne({ _id: "51788f538b545db9c7000001"}, function (err, docs) {
            if (err) res.json(err);
            docs.creds++;
            docs.save(function(err) {
                console.log(err);
                console.log(docs);
            });
        });
    });

    app.get("/photo", function(req, res) {
        var obj = {
                low_res: "low res",
                thumb: "thumb",
                std_res: "std res"
            };

        new Photo({
                comment: ["test", "me"],
                images: obj
            }).save(function (err, docs){
                if (err) res.json(err);

                // req.user.photos.push(pid);
                // console.log(req.user);
               console.log(docs);
               docs.comment.remove("me");
               console.log(docs);
              });
    });
}