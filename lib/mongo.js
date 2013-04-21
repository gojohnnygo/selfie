// dependencies
var path = require("path")
  , mongoose = require("mongoose")
  , findOrCreate = require("mongoose-findorcreate");

mongoose.connect('mongodb://localhost/selfie');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {});

exports.mongoose = mongoose;
exports.mongoose.findOrCreate = findOrCreate;