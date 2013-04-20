/**
 * App dependencies
 */
var express = require('express')
  , app = module.exports = express()
  , mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate');

mongoose.connect('mongodb://localhost/selfie');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {});

/**
 * User schemas
 */
var userSchema = mongoose.Schema({
    provider: String,
    provider_id: String,
    username: String,
    avatar_url: String,
    credits: Number,
    photos: Array,
    likes: Array,
    following: Array,
    followers: Array
});

userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);
module.parent.exports.user = User;

console.log(User.findOrCreate)

/**
 * Photo schemas
 */
var photoSchema = mongoose.Schema({
    owner: String,
  	likes: Array,
  	loc: {
    	name: String,
    	geo: { type: Array, index: '2d' }
  	}
});

photoSchema.plugin(findOrCreate);
var Photo = mongoose.model('Photo', userSchema);
module.parent.exports.photo = Photo;