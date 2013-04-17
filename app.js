/**
 * App dependencies
 */
var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path');

/**
 * Modules (separated into modules based on functionality)
 */
var db = require('./lib/db')
  , auth = require('./lib/auth')
  , user = require('./lib/user')
  , photo = require('./lib/photo');

app.use(db);
app.use(auth);
app.use(user);
app.use(photo);

/**
 * Config
 */
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'secret'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

/**
 * 
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
