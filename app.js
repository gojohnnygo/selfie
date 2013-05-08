// dependencies
var express = require("express")
  , http = require("http")
  , path = require("path")
  , app = express();

var passport = require(path.join(__dirname, "lib", "passport"))
  , routes = require("./routes")
  // , User = require(path.join(__dirname, "models", "user"))
  , mongoose = require("mongoose")
  , MongoStore = require('connect-mongo')(express);

// config
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret:'secret'}));
app.use(express.methodOverride());
app.use(express.static('./public', path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

routes(app);


// app.get('/', function(req, res) {
//     // if the request has the user object, go to the user page
//     if (req.user) {
//         console.log("?////")
//         res.redirect("/user/" + req.user._id);
//     }

//     res.render("index");
// });

// app.get('/user/:uid', function(req, res) {
//     console.log('the user')
//     console.log(req.user) // undefined
// });

/**
 * Param Helpers
 */
// app.param('uid', function(req, res, next, id) {
//     User.findOne({_id: id}, function (err, docs) {
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

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.configure('production', function(){
    app.use(express.logger());
});

// create server
http.createServer(app).listen(app.get("port"), function(err){
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Express server listening on port " + app.get("port"));
    }
});
