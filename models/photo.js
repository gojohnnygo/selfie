// dependencies
var path  = require("path")
  , mongo = require(path.join("..", "lib", "mongo"))
  , User = require(path.join("..", "models", "user"))
  , mongoose = mongo.mongoose
  , ObjectId = mongoose.Schema.Types.ObjectId;

// photo schema
var photoSchema = mongoose.Schema({
    owner: { type: ObjectId, ref: "User" },
    images: { 
      low_res: String,
      thumb: String,
      std_res: String
    },
    caption: String,
  	loc: {
    	name: String,
    	geo: { type: Array, index: '2d' }
  	},
    likers: [{ type: ObjectId, ref: "User" }],
    tot_likers: Number
});

photoSchema.plugin(mongoose.findOrCreate);
var Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;