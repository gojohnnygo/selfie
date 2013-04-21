// dependencies
var express = require("express")
  , http = require("http")
  , path = require("path")
  , routes = require("./routes")
  , passport = require(path.join(__dirname, "lib", "passport"));

var app = express();

// config
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret'}));
app.use(express.methodOverride());
app.use(express.static('/public', path.join(__dirname, 'public')));
app.use(app.router);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

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
