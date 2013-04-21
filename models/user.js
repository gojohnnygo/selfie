// dependencies
var path = require("path")
  , mongo = require(path.join("..", "lib", "mongo"));

// user schema
var userSchema = mongo.mongoose.Schema({
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

userSchema.plugin(mongo.mongoose.findOrCreate);
var User = mongo.mongoose.model('User', userSchema);
module.exports = User;