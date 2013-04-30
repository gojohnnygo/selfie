// dependencies
var path = require("path")
  , mongo = require(path.join("..", "lib", "mongo"))
  , Photo = require(path.join("..", "models", "photo"))
  , mongoose = mongo.mongoose
  , ObjectId = mongoose.Schema.Types.ObjectId;

// user schema
var userSchema = mongoose.Schema({
    auth: String,
    token: String,
    avatar: {type: ObjectId, ref: "Photo"},
    handle: String,
    about: String,
    creds: Number,
    loc: {
        name: String,
        geo: { type: Array, index: '2d' }
    },
    likes: [{type: ObjectId, ref: "Photo"}],
    photos: [{type: ObjectId, ref: "Photo"}],
    followers: [{type: ObjectId, ref: "User"}],
    following: [{type: ObjectId, ref: "User"}],
    tot_followers: Number,
    tot_following: Number,
    tot_likes: Number,
    tot_photos: Number
});

userSchema.plugin(mongoose.findOrCreate);
var User = mongoose.model('User', userSchema);
module.exports = User;