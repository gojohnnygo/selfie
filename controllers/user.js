// dependencies
var path = require("path")
  , User = require(path.join("..", "models", "user"))
  , Photo = require(path.join("..", "models", "photo"))
  , mongo = require(path.join("..", "lib", "mongo"))
  , controllerInstagram = require(path.join(__dirname, "instagram"))
  , mongoose = mongo.mongoose
  , fs = require('fs'); 

// call for testing
// exports.getAll = function(req, res) {
//     User.find({}, function (err, docs) {
//         if (err) res.json(err);
//         res.send(docs);
//     });
// };

exports.getUser = function(req, res) {
    console.log("getUser " + req.user);
    User.findOne({ _id: req.params.uid }, function (err, docs) {
        if (err) res.json(err);

        res.render("user", { user: req.user });
        // res.send(docs); // send just info when not using jade
    });
};

// for later, will get all likes/following/followers on initial call
exports.getPhotos = function(req, res) {};
exports.getLikes = function(req, res) {};
exports.getFollowing = function(req, res) {};
exports.getFollowers = function(req, res) {};

// later
exports.uploadPhoto = function(req, res) {
    var pid
      , tmp
      , target
      , path;

    pid = new mongoose.Types.ObjectId;
    tmp = req.files.userPhoto.path;
    target = './public/images/' + pid;
    path = '/images/' + pid;

    fs.rename(tmp, target, function(err) {
        if(err) throw err;
        fs.unlink(tmp, function() {
            if (err) throw err;
            
            new Photo({
                _id: pid,
                owner: req.params.uid
            }).save(function (err, docs){
                if (err) res.json(err);

                req.user.photos.push(pid);
                console.log(req.user);
                console.log(docs);
              });

            res.send(JSON.stringify({path: path}));
        });
    });
};

exports.addCredits = function(req, res) {

};

exports.editUser = function(req, res) {
    
};

exports.deleteUser = function(req, res) {
    
};

exports.deletePhoto = function(req, res) {
    
};