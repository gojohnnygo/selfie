// dependencies
var path  = require("path")
  , mongo = require(path.join("..", "lib", "mongo"));

// photo schema
var photoSchema = mongo.mongoose.Schema({
    owner: String,
  	likes: Array,
  	loc: {
    	name: String,
    	geo: { type: Array, index: '2d' }
  	}
});

photoSchema.plugin(mongo.mongoose.findOrCreate);
var Photo = mongo.mongoose.model('Photo', userSchema);
module.exports = Photo;