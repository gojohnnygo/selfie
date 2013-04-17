/**
 * App dependencies
 */
var express = require('express')
  , app = module.exports = express();

var User = module.parent.exports.user;
var Photo = module.parent.exports.photo;

/**
 * Param Helpers
 */
 app.param('uid', function(req, res, next, id) {
    User.find({_id: id}, function (err, docs) {
        if (err) res.json(err);
        req.user = docs[0];
        next();
    });
});

app.param('pid', function(req, res, next, id) {
    Photo.find({_id: id}, function (err, docs) {
        if (err) res.json(err);
        req.photo = docs[0];
        next();
    });
});

/**
 * Routes - Get
 */
app.get('/users', function(req, res) {
    console.log("get suers")
    User.find({}, function (err, docs) {
        if (err) res.json(err);
        res.send(docs);
    });
});

app.get('/user/:uid', function(req, res) {
  res.send(req.user);
});

app.get('/user/:uid/photos', function(req, res) {
  res.send(req.user.photos);
});

app.get('/user/:uid/photo/:pid', function(req, res) {
  res.send(req.user.photos[req.param('pid')]);
});

app.get('/user/:uid/likes', function(req, res) {
  res.send(req.user.likes);
});

app.get('/user/:uid/following', function(req, res) {
  res.send(req.user.following);
});

app.get('/user/:uid/followers', function(req, res) {
  res.send(req.user.followers);
});

/**
 * Routes - Post
 */
app.post('/user', function(req, res) {
  var b = req.body;

    new User({
      username: b.username,
    }).save(function (err, docs){
      if (err) res.json(err);
      res.send(docs);
    });
});

app.post('/user/:uid/photo', function(req, res) {
  res.send(req.user);
});

app.put('/user/:uid', function(req, res) {
  res.send(req.user);
});

/**
 * Routes - Delete
 */
app.delete('/user/:uid', function(req, res) {
  res.send(req.user);
});

app.delete('/user/:uid/photo/:pid', function(req, res) {
  res.send(req.user);
});