/**
 * App dependencies
 */
// var express = require('express')
//   , mongoose = require('mongoose')
//   , findOrCreate = require('mongoose-findorcreate')
//   , Schema = mongoose.Schema;

// var app = module.exports = express();
  
/**
 * Routes - Photo
 */
// app.get('/photo', function (req, res) {
//   Photo.find({}, function (err, docs) {
//     if (err) res.json(err);
//     res.send(docs);
//   });
// });

// app.post('/photo', function (req, res) {
//     var pid
//       , tmp
//       , target
//       , path;

//     pid = new mongoose.Types.ObjectId;
//     tmp = req.files.userPhoto.path;
//     target = './public/images/' + pid;
//     path = '/images/' + pid;

//     fs.rename(tmp, target, function(err) {
//         if(err) throw err;
//         fs.unlink(tmp, function() {
//             if (err) throw err;
            
//             new Photo({
//                 _id: pid
//             }).save(function (err, docs){
//                 if (err) res.json(err);

//                 console.log(docs);
//               });

//             res.send(JSON.stringify({path: path}));
//         });
//     });
// });

// app.get('/', function(req, res) {
//   var message = [
//     "<html>",
//     "<head>",
//     "<title>Upload Example</title>",
//     "</head>",
//     "<body>",
//     "<form id='uploadForm'",
//     "enctype='multipart/form-data'",
//     "action='/photo'",
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
//   ].join('\n');

//   res.send(message);
// });