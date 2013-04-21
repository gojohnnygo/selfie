// dependencies
var path = require("path")
  , User = require(path.join("..", "models", "user"));

/**
 * Param Helpers
 */
// app.param('uid', function(req, res, next, id) {
//     User.find({_id: id}, function (err, docs) {
//         if (err) res.json(err);
//         req.user = docs[0];
//         next();
//     });
// });

// app.param('pid', function(req, res, next, id) {
//     Photo.find({_id: id}, function (err, docs) {
//         if (err) res.json(err);
//         req.photo = docs[0];
//         next();
//     });
// });


exports.getAll = function(req, res) {
    console.log("get suers");
    User.find({}, function (err, docs) {
        if (err) res.json(err);
        res.send(docs);
    });
};

exports.getUser = function(req, res) {
    
};

exports.getPhotos = function(req, res) {
    
};

exports.getPhoto = function(req, res) {
    
};

exports.getLikes = function(req, res) {
    
};

exports.getFollowing = function(req, res) {
    
};

exports.getFollowers = function(req, res) {
    
};

exports.createUser = function(req, res) {
    var b = req.body;

    new User({
        username: b.username,
    }).save(function (err, docs){
        if (err) res.json(err);
        res.send(docs);
    });

};

exports.uploadPhoto = function(req, res) {
    
};

exports.editUser  = function(req, res) {
    
};

exports.deleteUser = function(req, res) {
    
};

exports.deletePhoto = function(req, res) {
    
};